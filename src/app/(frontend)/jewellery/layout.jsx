"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import InputDropdown from "@/components/inputDropdown/InputDropdown";

export default function JewelleryLayout({ children }) {
  const pathname = usePathname();

  const data = {
    categories: [
      { type_id: 40, slug: "all", type_name: "All" },
      { type_id: 1, slug: "ring", type_name: "Ring" },
      { type_id: 2, slug: "earring", type_name: "Earring" },
      { type_id: 3, slug: "bangle", type_name: "Bangle" },
      { type_id: 4, slug: "bracelet", type_name: "Bracelet" },
      { type_id: 8, slug: "chain", type_name: "Chain" },
      { type_id: 10, slug: "pendent", type_name: "Pendent" },
    ],
  };

  // Determine active category from URL
  const activeCategory =
    pathname === "/jewellery"
      ? "all"
      : pathname.split("/")[2]; // /jewellery/ring → ring

  return (
    <div className="min-h-svh px-10">
      <div className="bg-gray-50 rounded-sm p-5">
        <div className="flex justify-between items-center w-full mb-4 gap-4">
          {/* Categories */}
          <div className="cat-lists flex gap-2 flex-wrap items-center">
            {data.categories.map((item) => {
              const isActive = activeCategory === item.slug;

              return (
                <Link
                  key={item.type_id}
                  href={
                    item.slug === "all"
                      ? "/jewellery"
                      : `/jewellery/${item.slug}`
                  }
                  className={`
                    px-4 py-2 text-[12px] uppercase rounded-sm border transition
                    ${
                      isActive
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-primary hover:bg-primary/10"
                    }
                  `}
                >
                  {item.type_name}
                </Link>
              );
            })}
          </div>

          {/* Right Filter */}
          <div className="flex items-center">
            <InputDropdown />
          </div>
        </div>

        <Separator className="my-4 border-primary bg-primary/30" />

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
