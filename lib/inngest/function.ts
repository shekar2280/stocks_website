import { success } from "better-auth";
import { inngest } from "./client";
import { NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompt";
import { sendNewsSummaryEmail, sendWelcomeEmail, sendUpperAlert, sendLowerAlert, sendBuyOrderPin, sendSellOrderPin } from "../nodemailer";
import { getAllUsersForNewsEmail } from "../actions/user.action";
import { getCurrentPrice, getNews } from "../actions/finnhub.actions";
import { getFormattedTodayDate } from "../utils";
import { getWatchlistSymbolsByUserId } from "../actions/watchlist.actions";
import { connectToDB } from "@/database/mongoose";
import positionsModels from "@/database/models/positions.models";
import { ClosingPrice } from "@/database/models/closingPrices.models";

export const sendSignUpEmail = inngest.createFunction(
    {id: 'sign-up-email'},
    { event: 'app/user.created'},
    async ({ event, step }) => {
        const userProfile = `
        - Country: ${event.data.country}
        - Investment goals: ${event.data.investmentGoals}
        - Risk tolerance: ${event.data.riskTolerance}
        - Preferred industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)


        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.0-flash-lite'}),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }
        })

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining the app'

            const { data: { email, name }} = event;
            return await sendWelcomeEmail({
                email,
                name,
                intro: introText
            });
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
)

export const sendDailyNewsSummary = inngest.createFunction(
    { id: 'daily-news-summary' },
    [ { event: 'app/send.daily.news' }, { cron: '30 3 * * *' }],
    async ({ step }) => {
        const users = await step.run('get-all-users', getAllUsersForNewsEmail)

        if(!users || users.length === 0) return { success: false, message: 'No users found for news email' };

        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: User; articles: MarketNewsArticle[] }> = [];
            for (const user of users as User[]) {
                try {
                    const symbols = await getWatchlistSymbolsByUserId(user.id);
                    let articles = await getNews(symbols.map(s => s.s));
                    // Enforce max 6 articles per user
                    articles = (articles || []).slice(0, 6);
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6);
                    }
                    perUser.push({ user, articles });
                } catch (e) {
                    console.error('daily-news: error preparing user news', user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }
            return perUser;
        });

        const userNewsSummaries: { user: User; newsContent: string | null }[] = [];

        for (const { user, articles } of results) {
                try {
                    const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

                    const response = await step.ai.infer(`summarize-news-${user.email}`, {
                        model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
                        body: {
                            contents: [{ role: 'user', parts: [{ text:prompt }]}]
                        }
                    });

                    const part = response.candidates?.[0]?.content?.parts?.[0];
                    const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.'

                    userNewsSummaries.push({ user, newsContent });
                } catch (e) {
                    console.error('Failed to summarize news for : ', user.email);
                    userNewsSummaries.push({ user, newsContent: null });
                }
            }

        await step.run('send-news-emails', async () => {
                await Promise.all(
                    userNewsSummaries.map(async ({ user, newsContent}) => {
                        if(!newsContent) return false;

                        return await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent })
                    })
                )
            })

        return { success: true, message: 'Daily news summary emails sent successfully' }
    }
)

export const sendUpperAlertEmail = inngest.createFunction(
    {id: 'send-upper-alert-email'},
    { event: 'app/stock.upper_alert'},
    async ({event, step}) => {
        await step.run('send-upper-alert-email', async () => {
            const { userEmail, symbol, timestamp, companyName, currentPrice, targetPrice } = event.data;
            return await sendUpperAlert({
                userEmail,
                symbol,
                timestamp,
                companyName,
                currentPrice, 
                targetPrice,
            });
        })

        return {
            success: true,
            message: 'Upper target reached'
        }
    }
)

export const sendLowerAlertEmail = inngest.createFunction(
    {id: 'send-lower-alert-email'},
    { event: 'app/stock.lower_alert'},
    async ({event, step}) => {
        await step.run('send-lower-alert-email', async () => {
            const { userEmail, symbol, timestamp, companyName, currentPrice, targetPrice } = event.data;
            return await sendLowerAlert({
                userEmail,
                symbol,
                timestamp,
                companyName,
                currentPrice, 
                targetPrice,
            });
        })

        return {
            success: true,
            message: 'Lower target reached'
        }
    }
)

export const sendBuyOrderPinEmail = inngest.createFunction(
    {id: 'send-buy-order-pin-email'},
    { event: 'app/orders.buy_pin_generated'},
    async ({event, step}) => {
        await step.run('send-buy-order-pin-email', async () => {
            const { userEmail, symbol, pin, qty, price, timestamp, ttl } = event.data;
            return await sendBuyOrderPin({
                userEmail,
                symbol,
                pin,
                qty,
                price,
                timestamp,
                ttl
            });
        });

        return {
            success: true,
            message: 'Buy order pin email sent'
        }
    }
)

export const sendSellOrderPinEmail = inngest.createFunction(
    {id: 'send-sell-order-pin-email'},
    { event: 'app/orders.sell_pin_generated'},
    async ({event, step}) => {
        await step.run('send-sell-order-pin-email', async () => {
             const { userEmail, symbol, pin, qty, price, timestamp, ttl } = event.data;
             return await sendSellOrderPin({
                userEmail,
                symbol,
                pin,
                qty,
                price,
                timestamp,
                ttl
             });
        });

        return {
            success: true,
            message: 'Sell order pin email sent'
        }
    }
)

export const updateClosingPrices = inngest.createFunction(
  { id: "update-closing-prices" },

  [{ cron: "30 20 * * 1-5" }], 

  async ({ step }) => {
    await step.run("connect-db", async () => {
      await connectToDB();
    });

    const symbols = await step.run("get-unique-symbols", async () => {
      const positions = await positionsModels.find({});
      return [...new Set(positions.map((p) => p.symbol))];
    });

    if (symbols.length === 0) {
      return { success: false, message: "No symbols found" };
    }

    await step.run("update-prices", async () => {
      for (const symbol of symbols) {
        const price = await getCurrentPrice(symbol);
        if (!price) continue;

        await ClosingPrice.findOneAndUpdate(
          { symbol },
          { closePrice: price, updatedAt: new Date() },
          { upsert: true }
        );
      }
    });

    return { success: true };
  }
);