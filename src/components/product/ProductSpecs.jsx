"use client";
import React from "react";
import { Gem, Ruler, Diamond } from "lucide-react";

const specs = {
  metal: {
    icon: <Gem className="w-5 h-5 text-[#8B6A64]" />,
    title: "Metal",
    data: ["14 KT - White Gold", "Net Wt: 2.112 g"],
  },

  dimension: {
    icon: <Ruler className="w-5 h-5 text-[#8B6A64]" />,
    title: "Dimension",
    data: ["Height : 12mm", "Width : 20mm", "Gross Wt: 2.38 g"],
  },

  diamond: {
    icon: <Diamond className="w-5 h-5 text-[#8B6A64]" />,
    title: "Diamond",
    columns: [
      {
        title: "VVS-VS, EF",
        shape:"Marquise",
        pcs: "1pcs",
        wt: "0.90ct",
      },
      {
        title: "VVS-VS, EF",
        shape:"Round",
        pcs: "38pcs",
        wt: "0.146ct",
      },
      {
        title: "VVS-VS, EF",
        shape:"Round",
        pcs: "38pcs",
        wt: "0.146ct",
      },
      {
        title: "VVS-VS, EF",
        shape:"Round",
        pcs: "38pcs",
        wt: "0.146ct",
      },
    ],
  },

  gemstone: {
    icon: <Gem className="w-5 h-5 text-[#8B6A64]" />,
    title: "Gemstone",
    columns: [
      { title: "Green", shape:"Marquise", pcs: "1pcs", wt: "0.90ct" },
      { title: "Yellow", shape:"Round", pcs: "12pcs", wt: "0.146ct" },
      { title: "Brown", shape:"Pear", pcs: "3pcs", wt: "0.146ct" },
      { title: "Blue", shape:"Princess", pcs: "8pcs", wt: "0.146ct" },
    ],
  },
};

const SpecCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-lg font-medium text-[#8B6A64]">{title}</h3>
    </div>
    {children}
  </div>
);

const ProductSpecs = () => {
  return (
    <div className="space-y-6 mt-6">

      {/* Metal + Dimension */}
      <div className="grid grid-cols-2 gap-4">
        {/* Metal */}
        <SpecCard icon={specs.metal.icon} title={specs.metal.title}>
          <div className="text-sm text-gray-700 space-y-2">
            {specs.metal.data.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </SpecCard>

        {/* Dimension */}
        <SpecCard icon={specs.dimension.icon} title={specs.dimension.title}>
          <div className="text-sm text-gray-700 space-y-2">
            {specs.dimension.data.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </SpecCard>
      </div>

      {/* Diamond */}
      <SpecCard icon={specs.diamond.icon} title={specs.diamond.title}>
        <div className="grid grid-cols-4 gap-4">
          {specs.diamond.columns.map((col, index) => (
            <div key={index} className="text-sm text-gray-700 space-y-2">
              <p>{col.title}</p>
              <p>{col.shape}</p>
              <p>{col.pcs}</p>
              <p>{col.wt}</p>
            </div>
          ))}
        </div>
      </SpecCard>

      {/* Gemstone */}
      <SpecCard icon={specs.gemstone.icon} title={specs.gemstone.title}>
        <div className="grid grid-cols-4 gap-4">
          {specs.gemstone.columns.map((col, index) => (
            <div key={index} className="text-sm text-gray-700 space-y-2">
              <p>{col.title}</p>
              <p>{col.shape}</p>
              <p>{col.pcs}</p>
              <p>{col.wt}</p>
            </div>
          ))}
        </div>
      </SpecCard>

    </div>
  );
};

export default ProductSpecs;
