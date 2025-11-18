import { auth } from "@/lib/better-auth/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { newPassword, token } = body; 

    if (!newPassword || !token) {
      return NextResponse.json(
        { message: "Missing newPassword or token" },
        { status: 400 }
      );
    }

    const res = await auth.api.resetPassword({
      body: {
        newPassword, 
        token,       
      },
    });
    if (!res.status) {
      console.error("PASSWORD RESET ERROR: Status returned false");
      return NextResponse.json({ message: "Password reset failed. Token might be invalid or expired." }, { status: 400 });
    }

    return NextResponse.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ message: "Server fail" }, { status: 500 });
  }
}
