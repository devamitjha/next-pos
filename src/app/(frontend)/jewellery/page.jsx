"use client";
import ProductCard from "@/components/product/ProductCard";

export default function Product() {  
   
  return (
        <>         
          <div className="dynamic-title flex justify-between gap-4 items-center mb-4 text-sm">
            <div>All Jewellery</div>
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
