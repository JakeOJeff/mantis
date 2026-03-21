"use client";

import { useState } from "react";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await pb.collection("users").authWithPassword(email, password);
      router.push("/");
    } catch {
      setError("wrong email or password");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      {error && <p>{error}</p>}
      <button type="submit">login</button>
    </form>
  );
}
