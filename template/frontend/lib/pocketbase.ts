import PocketBase from "pocketbase";

export const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETBASE_URL ?? "http://127.0.0.1:8090"
);

export function persistAuth() {
  document.cookie = [
    `pb_auth=${encodeURIComponent(
      JSON.stringify({ token: pb.authStore.token, record: pb.authStore.record })
    )}`,
    "path=/",
    `max-age=${60 * 60 * 24 * 7}`,
    "SameSite=Lax",
  ].join("; ");
}

export function logout() {
  pb.authStore.clear();
  document.cookie = "pb_auth=; path=/; max-age=0; SameSite=Lax";
}
