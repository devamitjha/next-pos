"use client";
import { useState, useRef, useEffect } from "react";
import { Copy } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "@/components/cart/CartItem";
import PriceSummary from "@/components/product/PriceSummary";
import ProductSpecs from "@/components/product/ProductSpecs";
import PriceBreakup from "@/components/product/PriceBreakup";

export default function ProductPage() {
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const fullText =
    "Elegant and timeless, our Marquise Cut Diamond Engagement Ring features a stunning marquise-cut diamond set in a sleek, modern band designed to enhance brilliance and sparkle. Perfect for those who love sophistication and minimal elegance.";
  const shortText = fullText.substring(0, 80) + "...";
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isExpanded]);

  const getCustomizeData = ()=>{
    console.log("get customize data")
  }
  const copyText=()=>{
    console.log("copy Text");
  }


//shopify product Image
 useEffect(() => {
    const storedProduct = localStorage.getItem("shopifyImageID");
    if (!storedProduct) return;

    dispatch(fetchImagesStart());

    getProductImages(storedProduct)
      .then((res) => {
        if (res.data?.success) {
          dispatch(fetchImagesSuccess(res.data.images || []));
        } else {
          dispatch(fetchImagesFailure("No images found"));
        }
      })
      .catch((err) => {
        dispatch(fetchImagesFailure(err.message || "Image fetch failed"));
      });
  }, [dispatch]);
 
 
  return (
    <div className="w-full min-h-screen">
      <div className="min-h-svh px-10">
        <div className="flex justify-between items-start gap-6">
          <div className="w-[55%] sticky top-5">
            {/* <ProductThumbSlider/> */}
          </div>
          <div className="w-[45%]">

            <div className="flex justify-start items-center gap-3">
                <span className="font-semibold text-2xl">
                    ₹30249 
                </span>
                <span className="line-through text-gray-500 text-xl">
                    ₹38250
                </span>
            </div>

            <h2 className="text-xl line-clamp-1 my-4">Four Prong Round Solitaire Ring 7.50mm</h2>

            <div className="customization">
              <p className="text-lg">Size & Customization</p>
              <div className="border border-gray-200 rounded-xl p-3 mt-4">
                <div className="flex justify-between items-center gap-4 mb-4">
                  <div className="flex justify-start items-center gap-2">
                    <span className="flex w-4 h-4 rounded-full bg-[linear-gradient(135deg,#FAD813,#FFE585,#FAD813)]"></span>
                    <p className="text-base">18KT Yellow Gold</p>
                  </div>
                  <div className="w-px h-3 bg-black/50"></div>
                  <div className="flex justify-end items-center text-base">
                    Size: 12 IND
                  </div>
                </div>
                <div className="w-full h-11 bg-gray-200 rounded-lg flex justify-center items-center uppercase text-base font-semibold text-primary cursor-pointer" onClick={getCustomizeData}>Customize</div>
              </div>
            </div>

            <div className="btn-group mt-6 space-y-4">
              <div className="atc w-full h-12 border border-primary rounded-lg flex justify-center items-center text-primary uppercase text-base font-semibold cursor-pointer" onClick={() => setOpenCartSheet(true)}>Add To Cart</div>
              <div className="atc w-full h-12 border border-primary rounded-lg bg-primary flex justify-center items-center text-white uppercase text-base cursor-pointer">Buy Now</div>
            </div>

            {/* Benifits */}
            <div className="w-full flex justify-between items-center gap-2 mt-8">
              <div className="flex flex-col space-y-2 justify-center items-center">
                <span className="w-19 h-19 rounded-full bg-[#F3E0CF] flex justify-center items-center">1</span>
                <p className="text-center text-sm">Certified Jewellery</p>
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center">
                <span className="w-19 h-19 rounded-full bg-[#F3DCE0] flex justify-center items-center">1</span>
                <p className="text-center text-sm">Lucira Supporty</p>
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center">
                <span className="w-19 h-19 rounded-full bg-[#D6EEF4] flex justify-center items-center">1</span>
                <p className="text-center text-sm">15 Days Money Back</p>
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center">
                <span className="w-19 h-19 rounded-full bg-[#00800033] flex justify-center items-center">1</span>
                <p className="text-center text-sm">100% Lifetime Exchange</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-8">
              <div className="text-xl uppercase mt-6 mb-3">Product Details</div>
              <div className="flex justify-start items-center text-md gap-4 uppercase">
                <span>SKU : IJ-r00001 - 14wglgd-12</span>
                <span onClick={copyText}><Copy size={18} strokeWidth={1}/></span>
              </div>
              <div className="text-sm mt-2 text-black/70">    
                <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ height }}>
                  <div ref={contentRef}>{fullText}</div>
                </div>
                {!isExpanded && <span>{shortText}</span>}
                <span onClick={() => setIsExpanded(!isExpanded)} className="font-semibold text-primary cursor-pointer ml-1">
                  {isExpanded ? "Read Less" : "Read More..."}
                </span>
              </div>
            </div>
            <ProductSpecs/>
            <PriceBreakup />
          </div>
        </div>

        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>         
            <SheetContent>
              <SheetHeader className="bg-primary/5">
                  <SheetTitle>#CSI-RPO-09-25-00009</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100%-300px)] w-full">
                  <CartItem/>
              </ScrollArea>
              <SheetFooter className="p-0 bg-primary/10 pb-4">
                <PriceSummary />
                  <SheetClose asChild>
                      <div role="button" onClick={() => setOpenCartSheet(false)} className="atc w-[95%] mx-auto h-12 border border-primary rounded-lg bg-primary flex justify-center items-center text-white uppercase text-base">
                          proceed to checkout
                      </div>
                  </SheetClose>
              </SheetFooter>
          </SheetContent>
        </Sheet>
    </div> 
    </div>
  );
}
