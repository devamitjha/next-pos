"use client";

import { useState } from "react";

export default function PriceSummary() {
  const [showBreakup, setShowBreakup] = useState(false);

  return (
    <div className="w-full">
      {/* Toggle Content */}
      {showBreakup && (
        <div
          className="p-4 animate-fade"
        >
          <div className="flex justify-between py-1">
            <span>Product Price</span>
            <span>₹62,532</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Delivery</span>
            <span className="line-through text-gray-400">₹500</span>
          </div>
          <div className="flex justify-between py-1 font-semibold">
            <span>Final Total</span>
            <span>₹63,032</span>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center px-4 pt-4 pb-2">
        <span className="text-lg font-medium">
          Grand Total: <span className="font-bold">₹63,032</span>
        </span>

        {/* Toggle Button */}
        <button
          className="text-brand font-medium underline-offset-4 hover:underline"
          onClick={() => setShowBreakup(!showBreakup)}
        >
          {showBreakup ? "Hide Price Breakup" : "View Price Breakup"}
        </button>
      </div>
    </div>
  );
}
