"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setMsg(data.message);

    if(res.ok){
      router.push('/sign-in');
    }
  }

  return (
    <div className="w-full mt-20 items-center justify-center max-w-sm mx-auto border rounded-lg p-12 shadow-sm">
      <h1 className="text-2xl font-semibold mb-4 text-center text-yellow-500">
        Set New Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium">New Password*</label>
          <input
            type="password"
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <Button className="yellow-btn w-full">
          Reset Password
        </Button>

        {msg && (
          <p className="text-sm mt-2 text-center text-white">
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
