"use client";
import ProductCard from "@/components/product/ProductCard";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
   const activeCategory =
    pathname === "/jewellery"
      ? "all"
      : pathname.split("/")[2];

  const formatCategory = (slug) => {
    if (!slug || slug === "all") return "All Jewellery";

    return slug
      .split("-")
      .map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };


  return (
        <>         
          <div className="dynamic-title flex justify-between gap-4 items-center mb-4 text-sm">
            <div>Jewellery :: {formatCategory(activeCategory)}</div>
            <div>396 Items <span>|</span> In Stock</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {[...Array(16)].map((_, i) => (
                <ProductCard key={i}/>
              ))}          
          </div>
        </>  
  );
}
