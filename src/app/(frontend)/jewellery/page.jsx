"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/services/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------- Skeleton Card ---------- */
const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-73.25 w-73.25 rounded-xl" />
      <div className="space-y-2 h-20">
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-50" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
};

export default function Product() {
  const {
    data,
    size,
    setSize,
    isLoading,
    error,
  } = useProducts(16);

  if (error) {
    return <p className="text-red-500">Failed to load products</p>;
  }

  const products = data ? data.flatMap((p) => p.products) : [];
  const hasMore = data ? data[data.length - 1]?.hasMore : true;

  return (
    <>
      <div className="dynamic-title flex justify-between gap-4 items-center mb-4 text-sm">
        <div>All Jewellery</div>
        <div>{products.length} Items <span>|</span> In Stock</div>
      </div>

      <InfiniteScroll
        dataLength={products.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {products.map(
            (product) =>
              product.images?.[0]?.src && (
                <ProductCard
                  key={product.style_id}
                  product={product}
                />
              )
          )}
        </div>
      </InfiniteScroll>
    </>
  );
}
