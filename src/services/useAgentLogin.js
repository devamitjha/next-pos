import useSWRMutation from "swr/mutation";

const fetcher = async (url, { arg }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
};

export function useAgentLogin() {
  return useSWRMutation("/api/auth/login", fetcher);
}
