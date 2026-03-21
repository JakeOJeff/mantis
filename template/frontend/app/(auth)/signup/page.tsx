"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { pb, persistAuth } from "@/lib/pocketbase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await pb.collection("users").create({
        name,
        email,
        password,
        passwordConfirm: confirm,
      });
      await pb.collection("users").authWithPassword(email, password);
      persistAuth();
      router.push("/");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "something went wrong. try again.";
      setError(msg.toLowerCase());
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono font-bold text-sm text-primary">mantis</span>
        </div>
        <CardTitle className="text-xl font-mono font-semibold">create account</CardTitle>
        <CardDescription className="font-mono text-xs">
          get started with your own infrastructure
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="font-mono text-xs">name</Label>
            <Input
              id="name"
              type="text"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="font-mono text-xs">email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="font-mono text-xs">password</Label>
            <Input
              id="password"
              type="password"
              placeholder="min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm" className="font-mono text-xs">confirm password</Label>
            <Input
              id="confirm"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              className="font-mono text-sm"
            />
          </div>

          {error && (
            <p className="text-destructive text-xs font-mono">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full font-mono text-sm"
          >
            {loading ? "creating account..." : "create account →"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs font-mono text-muted-foreground">
          already have an account?{" "}
          <Link href="/login" className="text-foreground underline underline-offset-4">
            sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
