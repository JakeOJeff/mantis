"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { pb, persistAuth } from "@/lib/pocketbase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await pb.collection("users").authWithPassword(email, password);
      persistAuth();
      router.push("/");
    } catch {
      setError("invalid email or password.");
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
        <CardTitle className="text-xl font-mono font-semibold">sign in</CardTitle>
        <CardDescription className="font-mono text-xs">
          enter your credentials to continue
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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
            {loading ? "signing in..." : "sign in →"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs font-mono text-muted-foreground">
          no account?{" "}
          <Link href="/signup" className="text-foreground underline underline-offset-4">
            sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
