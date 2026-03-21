import { pb } from "@/lib/pocketbase";

export default function Home() {
  return (
    <main>
      <h1>mantis</h1>
      <p>pocketbase: {process.env.NEXT_PUBLIC_POCKETBASE_URL}</p>
    </main>
  );
}
