"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import { connectToDB } from "@/database/mongoose";
import { ObjectId } from "mongodb";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });

    const userId = response?.user?.id;
    if (!userId) throw new Error("Missing user ID");
    const mongoose = await connectToDB();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Not connected to DB");

    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
          balance: 5000,
        },
      }
    );

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }
    return { success: true, data: response };
  } catch (e) {
    console.log("Sign up failed", e);
    return { success: false, error: "Sign up failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign in failed", e);
    return { success: false, error: "Sign in failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log("Sign out failed", e);
    return { success: false, error: "Sign out failed" };
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  if (userId !== session.user.id) throw new Error("Invalid user");

  const mongoose = await connectToDB();
  const db = mongoose.connection.db;
  if (!db) throw new Error("DB not connected");

  await db.collection("user").updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        ...(data.fullName && { name: data.fullName }),
        ...(data.country && { country: data.country }),
        ...(data.investmentGoals && { investmentGoals: data.investmentGoals }),
        ...(data.riskTolerance && { riskTolerance: data.riskTolerance }),
        ...(data.preferredIndustry && {
          preferredIndustry: data.preferredIndustry,
        }),
      },
    }
  );

  return { success: true };
};
