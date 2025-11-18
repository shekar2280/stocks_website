import { NextResponse } from "next/server";
import { auth } from "@/lib/better-auth/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    const res = await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "https://stocksy-coral.vercel.app/reset-password",
      },
    });

    if (!res.status) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Reset link sent to your email",
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { message: "Server fail" },
      { status: 500 }
    );
  }
}
