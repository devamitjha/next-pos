"use client";
import ProductCard from "@/components/product/ProductCard";
import { usePathname } from "next/navigation";
import { useProducts } from "@/services/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------- Skeleton Card ---------- */
const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-2 px-1">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center pt-2">
           <div className="space-y-1 w-1/2">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-full" />
           </div>
           <Skeleton className="h-8 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
};

import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTotalCount } from "@/redux/slices/productSlice";

export default function Page() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const activeCategory = pathname === "/jewellery" ? "all" : pathname.split("/")[2];
  const isSideCartOpen = useSelector((state) => state.sheet.isSideCartOpen);

  const {
    data,
    size,
    setSize,
    isLoading,
    error,
  } = useProducts(16);

  const products = data ? data.flatMap((p) => p.products) : [];
  const hasMore = data ? data[data.length - 1]?.hasMore : true;
  const totalCount = data ? data[0]?.totalCount : 0;

  useEffect(() => {
    dispatch(setTotalCount(totalCount));
  }, [totalCount, dispatch]);

  if (error) {
    return <p className="text-red-500 text-center py-10 font-bold">Failed to load products. Please try again.</p>;
  }

  const gridCols = isSideCartOpen 
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <>         
      <InfiniteScroll
        dataLength={products.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore}
        loader={
          <div className={`grid ${gridCols} gap-8 mt-8`}>
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={`loader-${i}`} />
            ))}
          </div>
        }
        endMessage={
          <p className="text-center text-gray-400 my-10 font-medium italic">
            Yay! You have seen it all 💎
          </p>
        }
        scrollableTarget="main-scroll-root"
      >
        <div className={`grid ${gridCols} gap-8`}>
          {products.map((product, index) => (
            <ProductCard key={`${product.item_id}-${index}`} product={product} index={index} />
          ))}
        </div>
      </InfiniteScroll>

      {isLoading && products.length === 0 && (
        <div className={`grid ${gridCols} gap-8`}>
          {[...Array(12)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
    </>  
  );
}
