import React from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ChevronRight, Star, Tally1   } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


const ProductCard = () => {  
  return (
    <div className="rounded-sm mb-1">
        <Link href="/product-details">
            <AspectRatio ratio={1/1} className="bg-muted rounded-lg overflow-hidden cursor-pointer" >       
                <Image
                    src="/images/sample.jpg"
                    alt="sample"
                    width="400"
                    height="400"
                    priority
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                />           
            </AspectRatio>
        </Link>
        <div className="flex justify-between items-center w-full gap-4 px-2 mt-4">
            <div className="flex w-1/2 space-x-1 justify-start items-center">
                <span className="w-4 h-4 rounded-full bg-[linear-gradient(135deg,#FAD813,#FFE585,#FAD813)]"></span>
                <span className="w-4 h-4 rounded-full bg-[linear-gradient(135deg,#FFB289,#FFC9AC,#FFB289)]"></span>
                <span className="w-4 h-4 rounded-full bg-[linear-gradient(135deg,#C8C8C8,#F2F2F2,#C5C5C5)]"></span>
            </div>
            <div className="flex w-1/2 space-x-2 justify-end items-center">
                <div className="flex items-center justify-start space-x-0.5">
                    <Star size={12} strokeWidth={1} className="text-amber-400 fill-amber-400"/>
                    <span className="text-sm">4.5</span>
                </div>
                <div className="w-px h-3 bg-black/50">{/* <Tally1 size={14} strokeWidth={1}/> */}</div>
                <div className="text-sm">5</div>
            </div>                
        </div>
        <div className="product-details space-y-2 mt-2.5 px-2">
            <Link href="/product-details" className="inline-block hover:text-primary">
                <h2 className="line-clamp-1 text-base cursor-pointer hover:text-brand transition-colors">Round Diamond Tennis Bangle</h2>
            </Link>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                        ₹35000 
                    </span>
                    <span className="line-through text-gray-500 text-md">
                        ₹40000
                    </span>
                </div>
                <div className="text-[10px] text-gray-500 flex items-center justify-center cursor-pointer hover:text-brand transition-colors" >View Details <ChevronRight size={8}/></div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard