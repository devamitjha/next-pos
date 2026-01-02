import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Best Selling", value: "best_selling" },
  { label: "What's New", value: "new" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const InputDropdown = ({
  categories = [],
  currentPath,
  onSelect,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("Featured");
  const dropdownRef = useRef(null);

  // Sync selected label with route
  useEffect(() => {
    if (!categories.length) return;

    const activeCat = categories.find((c) => c.path === currentPath);
    if (activeCat) setSelected(activeCat.label);
  }, [currentPath, categories]);

  const handleCategorySelect = (cat) => {
    setSelected(cat.label);
    setMenuOpen(false);
    onSelect?.({ type: "category", value: cat.path });
  };

  const handleSortSelect = (sort) => {
    setSelected(sort.label);
    setMenuOpen(false);
    onSelect?.({ type: "sort", value: sort.value });
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-56 flex-1">
      {/* Header */}
      <button
        onClick={() => setMenuOpen((p) => !p)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-primary rounded-md shadow-sm"
      >
        <span className="text-sm truncate">{selected}</span>
         <SlidersHorizontal size={16} strokeWidth={1} />
      </button>

      {/* Menu */}
      {menuOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg overflow-hidden">
          {/* Categories */}
          {categories.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500">
                Categories
              </div>

              {categories.map((cat) => (
                <button
                  key={cat.path}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    currentPath === cat.path
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              <div className="h-px bg-gray-200 my-1" />
            </>
          )}

          {/* Sort */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500">
            Sort By
          </div>

          {SORT_OPTIONS.map((sort) => (
            <button
              key={sort.value}
              onClick={() => handleSortSelect(sort)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
            >
              {sort.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputDropdown;
