"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/request-password-reset", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json().catch(() => ({ message: "Error" }));
    setMsg(data.message || "Error");
    setLoading(false);
  }

  return (
    <div className="w-full mt-20 items-center justify-center max-w-sm mx-auto border rounded-lg p-12 shadow-sm">
      <h1 className="text-2xl font-semibold mb-4 text-center text-yellow-500">Reset Password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          disabled={loading}
          className="yellow-btn w-full"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        {msg && (
          <p className="text-sm mt-2 text-center text-white">{msg}</p>
        )}
      </form>
    </div>
  );
}
