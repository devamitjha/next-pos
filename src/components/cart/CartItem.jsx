"use client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Shield, Plus, Minus   } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CartItem() {
  const [quantity, setQuantity] = useState(1);
  const [insurance, setInsurance] = useState(false);

  return (
   
      <div className="px-4 py-4 space-y-6">
        {/* CART ITEM 1 */}
        <div className="border rounded-2xl p-4 flex gap-4 items-center">
          <div className="w-20 h-20 bg-gray-100 rounded-xl"></div>

          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-sm">
              Round Halo Twisted Engagement Ring
            </h3>

            <p className="text-[10px] text-gray-500">
              Color: 14KT Yellow Gold &nbsp; • &nbsp; Size: 12
            </p>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold">₹63,253</span>
                <span className="text-sm text-gray-400 line-through ml-2">₹69,253</span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  className="w-7 h-6 flex items-center justify-center border rounded-md"
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                >
                  <Minus  size={12} strokeWidth={1}/>
                </button>

                <span className="text-sm font-semibold">{quantity}</span>

                <button
                  className="w-7 h-6 flex items-center justify-center border rounded-md"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                   <Plus size={12} strokeWidth={1}/>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* APPLY INSURANCE */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={20} className="text-gray-600" />
            <span className="font-semibold text-sm text-gray-800 tracking-wide">
              APPLY INSURANCE
            </span>
          </div>

          <div className="border rounded-2xl p-4 space-y-3">
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                    id="insurance"
                    checked={insurance}
                    onCheckedChange={(checked) => setInsurance(checked)}
                    className="
                        data-[state=checked]:border-blue-600
                        data-[state=checked]:bg-blue-600
                        data-[state=checked]:text-white
                    "
                />
                <span className="text-sm">
                  Include Insurance For Your Jewellery
                </span>
              </div>
              <span className="font-bold">₹999</span>
            </label>

            {/* Insurance Points */}
            <div className="mt-2 space-y-2 pl-8 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> Full Year Jewelry Guard
              </p>
              <p className="flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> Trusted Partner
              </p>
              <p className="flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> Hassle Free Claim
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
