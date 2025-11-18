import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDB } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";
import { sendResetPasswordEmail } from "../nodemailer";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const mongoose = await connectToDB();
  const db = mongoose.connection.db;

  if (!db) throw new Error("MongoDB connection not found");

  authInstance = betterAuth({
    database: mongodbAdapter(db as any),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,

      sendResetPassword: async ({ user, url, token }, req) => {
        const finalUrl = `https://stocksy-coral.vercel.app/reset-password?token=${token}`;
        await sendResetPasswordEmail({
          email: user.email,
          url: finalUrl,
          token,
        });
      },

      onPasswordReset: async ({ user }) => {
        console.log("Password reset completed for:", user.email);
      },
    },
    plugins: [nextCookies()],
  });

  return authInstance;
};

export const auth = await getAuth();
