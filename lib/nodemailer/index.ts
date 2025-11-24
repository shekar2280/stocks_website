import nodemailer from "nodemailer";
import {
  BUY_ORDER_PIN_EMAIL_TEMPLATE,
  NEWS_SUMMARY_EMAIL_TEMPLATE,
  RESET_PASSWORD_EMAIL_TEMPLATE,
  SELL_ORDER_PIN_EMAIL_TEMPLATE,
  STOCK_ALERT_LOWER_EMAIL_TEMPLATE,
  STOCK_ALERT_UPPER_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./template";
import { Pin } from "lucide-react";

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
  token,
}: {
  email: string;
  url: string;
  token: string;
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


export const sendBuyOrderPin = async ({
  userEmail,
  symbol,
  pin,
  qty,
  price,
  timestamp,
  ttl
} : PinEmailData) => {
  const htmlTemplate = BUY_ORDER_PIN_EMAIL_TEMPLATE
  .replace(/{{timestamp}}/g, timestamp)
  .replace(/{{symbol}}/g, symbol)
  .replace(/{{pin}}/g, pin)
  .replace(/{{qty}}/g, qty)
  .replace(/{{price}}/g, price)
  .replace(/{{ttl}}/g, ttl)

  const mailOptions = {
    from: `"Stocksyy" <somashekar528234@gmail.com>`,
    to: userEmail,
    subject: `Buy Order Confirmation Pin`,
    text: `PIN to buy ${symbol} stocks`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
}

export const sendSellOrderPin = async ({
  userEmail,
  symbol,
  pin,
  qty,
  price,
  timestamp,
  ttl
} : PinEmailData) => {
  const htmlTemplate = SELL_ORDER_PIN_EMAIL_TEMPLATE
  .replace(/{{timestamp}}/g, timestamp)
  .replace(/{{symbol}}/g, symbol)
  .replace(/{{pin}}/g, pin)
  .replace(/{{qty}}/g, qty)
  .replace(/{{price}}/g, price)
  .replace(/{{ttl}}/g, ttl)

  const mailOptions = {
    from: `"Stocksyy" <somashekar528234@gmail.com>`,
    to: userEmail,
    subject: `Sell Order Confirmation Pin`,
    text: `PIN to sell ${symbol} stocks`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
}