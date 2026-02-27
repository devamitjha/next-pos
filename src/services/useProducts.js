import useSWRInfinite from "swr/infinite";
import { useSearchParams, usePathname } from "next/navigation";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch products");
  }
  return res.json();
};

export function useProducts(limit = 16) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const typeId = searchParams.get("t");

  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.hasMore) return null;

      // 👇 Decide API based on route
      if (pathname === "/jewellery") {
        return `/api/products?page=${pageIndex}&limit=${limit}`;
      }

      return `/api/products/by-type?page=${pageIndex}&limit=${limit}&t=${typeId}`;
    },
    fetcher,
    { revalidateOnFocus: false }
  );
}
