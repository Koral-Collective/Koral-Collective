"use client";

import { useState, type FormEvent } from "react";

export function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      window.location.assign("/schedule");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md px-4 pb-20 pt-36 sm:px-6 sm:pt-44" aria-labelledby="admin-login-title">
      <div className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Koral Collective</p>
        <h1 id="admin-login-title" className="mt-3 font-serif font-medium">Admin sign in</h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm font-medium">
            <span>Username</span>
            <input name="username" autoComplete="username" required maxLength={120} className="w-full border border-[var(--color-border-strong)] bg-white px-3 py-2.5 font-normal outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]" />
          </label>
          <label className="block space-y-2 text-sm font-medium">
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" required maxLength={256} className="w-full border border-[var(--color-border-strong)] bg-white px-3 py-2.5 font-normal outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]" />
          </label>
          {error ? <p role="alert" className="text-sm text-red-800">{error}</p> : null}
          <button disabled={loading} className="w-full bg-[var(--color-brand-primary)] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
