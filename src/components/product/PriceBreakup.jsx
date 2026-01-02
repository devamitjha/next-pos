"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PriceDetails() {
  const [activeTab, setActiveTab] = useState("breakup");

  return (
    <div className="w-full overflow-hidden bg-white mt-6">
      <div className="flex bg-gray-100 rounded-full overflow-hidden">
        {["breakup", "difference"].map((tab) => {
            const isActive = activeTab === tab;
            return (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative flex-1 text-center py-3 capitalize"
            >
                {/* Animated background */}
                {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                )}

                {/* Text (above the background) */}
                <span className={`relative z-10 ${isActive ? "text-white" : "text-black"}`}>
                {tab === "breakup" ? "Price Breakup" : "Discover the Difference"}
                </span>
            </button>
            );
        })}
        </div>

      {/* -------------------- CONTENT -------------------- */}
      <div className="p-5 relative rounded-xl bg-gray-100 mt-4">
        <AnimatePresence mode="wait">
          {activeTab === "breakup" ? (
            <motion.div
              key="breakup"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <PriceBreakup />
            </motion.div>
          ) : (
            <motion.div
              key="difference"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
            <DiscoverDifference />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ProductCertified />
    </div>
  );
}

function PriceBreakup() {
  return (
    <div className="space-y-4">
      <Row label="18 KT Yellow Gold (₹12,599/g)" value="₹21,310" />
      <Row
        label="VVS/VS, EF (33 Pcs.)"
        value="₹44,760"
        strike="₹59,680"
      />
      <Row label="Gemstone - Other (1 Pcs.)" value="₹1,850" />
      <Row label="Making Charges" value="₹3,454" strike="₹4,317" />
      <Row label="GST (3%)" value="₹2,086" />

      <div className="my-2 border-t"></div>

      <Row label="Total" value="₹71,609" strike="₹87,157" bold />
    </div>
  );
}

function DiscoverDifference() {
  return (
    <div className="text-gray-600 text-sm leading-relaxed">
      This section will contain comparison details, feature highlights,
      craftsmanship explanation, etc.  
      (Replace this with your real content.)
    </div>
  );
}

function Row({ label, value, strike, bold }) {
  return (
    <div className="flex justify-between text-sm">
      <span className={bold ? "font-bold" : ""}>{label}</span>
      <span className="flex gap-2">
        {strike && <span className="line-through opacity-60">{strike}</span>}
        <span className={bold ? "font-bold text-gray-800" : ""}>{value}</span>
      </span>
    </div>
  );
}

function ProductCertified() {
  return (
    <div className="mt-6 text-center">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold tracking-wide">
          PRODUCT IS CERTIFIED
        </h3>
        <button className="text-primary text-sm font-semibold border-b border-primary">
          Check Sample Certificate
        </button>
      </div>

      {/* Logos row (replace with actual images) */}
      <div className="flex items-center justify-between mt-6 gap-6 opacity-80 px-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      </div>

      <p className="text-xs text-gray-600 mt-6">
        Note: Our products are handcrafted and personalised for your delight,
        hence a weight variance is expected.
      </p>
    </div>
  );
}
