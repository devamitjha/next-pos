import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) throw new Error("Failed to load stores");
  return res.json();
};

export function useStores() {
  return useSWR("/api/stores", fetcher);
}
