import nodemailer from "nodemailer";
import {
  NEWS_SUMMARY_EMAIL_TEMPLATE,
  RESET_PASSWORD_EMAIL_TEMPLATE,
  STOCK_ALERT_LOWER_EMAIL_TEMPLATE,
  STOCK_ALERT_UPPER_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./template";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro
  );

  const mailOptions = {
    from: `"Stocksyy" <somashekar528234@gmail.com>`,
    to: email,
    subject: `Welcome to stocksyy  📈`,
    text: "Thanks for joining stocksyy",
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> => {
  const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace(
    "{{date}}",
    date
  ).replace("{{newsContent}}", newsContent);

  const mailOptions = {
    from: `"Stocksy`,
    to: email,
    subject: `📈 Market News Summary Today - ${date}`,
    text: `Today's market news summary from Stocksy`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendUpperAlert = async ({
  userEmail,
  symbol,
  timestamp,
  companyName,
  currentPrice,
  targetPrice,
}: AlertData) => {

  const htmlTemplate = STOCK_ALERT_UPPER_EMAIL_TEMPLATE
  .replace(/{{symbol}}/g, symbol)
  .replace(/{{timestamp}}/g, timestamp)
  .replace(/{{company}}/g, companyName)
  .replace(/{{currentPrice}}/g, String(currentPrice))
  .replace(/{{targetPrice}}/g, String(targetPrice));

  const mailOptions = {
    from: `"Stocksyy" <somashekar528234@gmail.com>`,
    to: userEmail,
    subject: `🐂 ${companyName} - ${symbol} has reached your price threshold`,
    text: `${companyName} reachead your upper target`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendLowerAlert = async ({
  userEmail,
  symbol,
  timestamp,
  companyName,
  currentPrice,
  targetPrice,
}: AlertData) => {

  const htmlTemplate = STOCK_ALERT_LOWER_EMAIL_TEMPLATE
  .replace(/{{symbol}}/g, symbol)
  .replace(/{{timestamp}}/g, timestamp)
  .replace(/{{company}}/g, companyName)
  .replace(/{{currentPrice}}/g, String(currentPrice))
  .replace(/{{targetPrice}}/g, String(targetPrice));

  const mailOptions = {
    from: `"Stocksyy" <somashekar528234@gmail.com>`,
    to: userEmail,
    subject: `🐻 ${companyName} - ${symbol} has reached your price threshold`,
    text: `${companyName} reachead your lower target`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async ({
  email,
  url,
}: {
  email: string;
  url: string;
}) => {
  const htmlTemplate = RESET_PASSWORD_EMAIL_TEMPLATE.replace("{{url}}", url);

  const mailOptions = {
    from: `"Stocksyy" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: "Reset your password",
    text: `Reset your password: ${url}`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
