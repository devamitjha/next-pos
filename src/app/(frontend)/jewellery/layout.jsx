"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Home, 
  LayoutDashboard, 
  ShoppingBag, 
  History, 
  BarChart3, 
  User as UserIcon, 
  Search,
  ChevronDown,
  Edit2,
  Plus,
  Minus,
  Zap,
  Gem,
  Flame,
  Star,
  Heart,
  X,
  ScanBarcode,
  ArrowLeft
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSelector, useDispatch } from "react-redux";
import { toggleSideCart } from "@/redux/slices/sheetSlice";
import { removeItem, addItem } from "@/redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";

export default function JewelleryLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [skuSearch, setSkuSearch] = useState("");

  const selectedStore = useSelector((state) => state.selectedStore.store);
  const storeCode = selectedStore?.code || "SC";
  
  const isSideCartOpen = useSelector((state) => state.sheet.isSideCartOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const totalProductCount = useSelector((state) => state.product.totalCount);

  const handleSkuSearch = (e) => {
    if (e.key === "Enter" && skuSearch.trim()) {
      router.push(`/jewellery/product/${skuSearch.trim()}`);
      setSkuSearch("");
    }
  };

  const handleScanClick = () => {
    if (skuSearch.trim()) {
      router.push(`/jewellery/product/${skuSearch.trim()}`);
      setSkuSearch("");
    }
  };

  const categories = [
    { type_id: 40, slug: "all", type_name: "All", icon: <Zap size={18} /> },
    { type_id: 1, slug: "ring", type_name: "Ring", icon: <Gem size={18} /> },
    { type_id: 2, slug: "earring", type_name: "Earring", icon: <Flame size={18} /> },
    { type_id: 12, slug: "nosepins", type_name: "Nosepins", icon: <Flame size={18} /> },
    { type_id: 8, slug: "chain", type_name: "Chain", icon: <ShoppingBag size={18} /> },
    { type_id: 10, slug: "pendants", type_name: "Pendants", icon: <ShoppingBag size={18} /> },
    { type_id: 3, slug: "bangle", type_name: "Bangle", icon: <Star size={18} /> },
    { type_id: 4, slug: "bracelet", type_name: "Bracelet", icon: <ShoppingBag size={18} /> },
  ];

  const activeCategory = pathname === "/jewellery" ? "all" : pathname.split("/")[2];

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price || 5000), 0);
  const tax = totalAmount * 0.03;

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden relative font-poppins">
      {/* 1. Left Vertical Sidebar (Fixed Height) */}
      <aside className="w-20 bg-white flex flex-col items-center py-6 gap-8 border-r h-full z-20">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer" onClick={() => router.push("/jewellery")}>
          L
        </div>
        
        <nav className="flex flex-col gap-4 flex-1">
          {[
            { icon: <Home size={22} />, label: "Home", active: false, path: "/jewellery" },
            { icon: <LayoutDashboard size={22} />, label: "Table", active: false },
            { icon: <ShoppingBag size={22} />, label: "Menu", active: true, path: "/jewellery" },
            { icon: <ShoppingBag size={22} />, label: "Order", active: false },
            { icon: <History size={22} />, label: "History", active: false },
            { icon: <BarChart3 size={22} />, label: "Report", active: false },
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => item.path && router.push(item.path)}
              className={`p-3 rounded-xl cursor-pointer transition-all ${
                item.active ? "bg-[#EA734D] text-white shadow-lg shadow-orange-200" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {item.icon}
            </div>
          ))}

          {/* Heart Icon with Badge */}
          <div 
            className={`p-3 rounded-xl cursor-pointer transition-all relative ${
              isSideCartOpen ? "bg-red-50 text-red-500 shadow-md" : "text-gray-400 hover:text-red-400"
            }`}
            onClick={() => dispatch(toggleSideCart())}
          >
            <Heart size={22} fill={isSideCartOpen ? "currentColor" : "none"} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartItems.length}
              </span>
            )}
          </div>
        </nav>

        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#EA734D] font-black text-[10px] shadow-sm border border-orange-100 uppercase text-center leading-tight p-1">
            {storeCode}
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
            <UserIcon className="w-full h-full p-2 text-gray-500" />
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area - This is the scrollable container */}
      <main id="main-scroll-root" className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative scroll-smooth">
        
        {/* PRODUCT PAGE HEADER: Unified, Non-Sticky row */}
        {pathname.includes("/product/") && (
          <div className="px-6 pt-6 mb-8 flex items-center bg-[#F5F5F5] z-30 py-4 shadow-none gap-4">
            {/* Left: Back Link */}
            <div className="w-1/4 flex justify-start">
              <Link 
                href="/jewellery"
                className="flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors font-bold text-[10px] uppercase tracking-widest whitespace-nowrap"
              >
                <ArrowLeft size={14} /> Back to Catalog
              </Link>
            </div>

            {/* Center: Title */}
            <div className="flex-1 flex flex-col items-center text-center">
               <h1 className="text-2xl font-black text-gray-800 uppercase italic tracking-tighter">Product Billing</h1>
               <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{storeCode} • Ornaverse Live Catalog</p>
            </div>

            {/* Right: Search & Scan */}
            <div className="w-1/4 flex justify-end">
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-full max-w-[280px]">
                <div className="relative group flex-1">
                  <input 
                    type="text" 
                    placeholder="Enter SKU or Search..." 
                    value={skuSearch}
                    onChange={(e) => setSkuSearch(e.target.value)}
                    onKeyDown={handleSkuSearch}
                    className="w-full bg-gray-50/50 rounded-xl py-2 pl-10 pr-4 outline-none text-[10px] text-gray-600 border border-transparent focus:bg-white focus:border-orange-100 transition-all font-bold"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#EA734D] transition-colors" size={14} />
                </div>
                <button onClick={handleScanClick} className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:bg-black transition-all"><ScanBarcode size={16} /></button>
              </div>
            </div>
          </div>
        )}

        {/* CATALOG PAGE HEADER: Separate Title Row */}
        {!pathname.includes("/product/") && (
          <div className="px-6 pt-6 mb-4">
             <h1 className="text-2xl font-black text-gray-800 uppercase italic tracking-tighter">
               Choose {activeCategory === "all" ? "Jewellery" : activeCategory} ({totalProductCount})
             </h1>
             <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{storeCode} • Ornaverse Live Catalog</p>
          </div>
        )}

        {/* CATALOG PAGE STICKY ROW: Categories + Search */}
        {!pathname.includes("/product/") && (
          <div className="sticky top-0 bg-[#F5F5F5]/90 backdrop-blur-md z-30 px-6 py-4 flex items-center gap-4 transition-all duration-300 border-b border-transparent mb-4">
            <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <Link 
                    key={cat.type_id}
                    href={cat.slug === "all" ? "/jewellery" : `/jewellery/${cat.slug}?t=${cat.type_id}`}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black transition-all whitespace-nowrap border uppercase tracking-tight ${
                      isActive 
                        ? "bg-[#EA734D] text-white border-[#EA734D] shadow-lg shadow-orange-100 scale-105" 
                        : "bg-white text-gray-500 border-gray-100 hover:border-orange-200"
                    }`}
                  >
                    {cat.icon && <span className="opacity-80">{cat.icon}</span>}
                    {cat.type_name}
                  </Link>
                );
              })}
            </div>

            {/* Search always available in sticky row on catalog */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-2xl shadow-sm border border-gray-100 ml-4">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="SKU or Search..." 
                  value={skuSearch}
                  onChange={(e) => setSkuSearch(e.target.value)}
                  onKeyDown={handleSkuSearch}
                  className="w-32 lg:w-56 bg-gray-50/50 rounded-xl py-2.5 pl-10 pr-4 outline-none text-xs text-gray-600 border border-transparent focus:bg-white focus:border-orange-100 transition-all font-bold"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#EA734D] transition-colors" size={16} />
              </div>
              <button onClick={handleScanClick} className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-xl hover:bg-black transition-all"><ScanBarcode size={20} /></button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col px-6 py-4">
          <div id="main-product-container">
            {children}
          </div>
        </div>

        <div className="px-6">
          <Footer />
        </div>
      </main>

      {/* 3. Right Sidebar (Selected Products - Fixed Overlay) */}
      <AnimatePresence>
        {isSideCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(toggleSideCart())}
              className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            />
            
            <motion.aside 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 w-96 bg-white flex flex-col border-l shadow-2xl z-50 h-screen"
            >
              <div className="p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Wishlist</h2>
                    <span className="text-lg font-bold">Selected Items</span>
                  </div>
                  <button 
                    onClick={() => dispatch(toggleSideCart())}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button className="flex-1 bg-[#EA734D] text-white py-2 rounded-lg text-sm font-bold shadow-md">Cart</button>
                  <button className="flex-1 text-gray-500 py-2 rounded-lg text-sm font-bold">Saved</button>
                </div>
              </div>

              {/* Order Items List */}
              <div className="flex-1 overflow-y-auto px-6 space-y-6 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2 opacity-50">
                    <Heart size={48} strokeWidth={1} />
                    <p className="text-sm">Wishlist is empty</p>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 cursor-pointer group" onClick={() => {
                      router.push(`/jewellery/product/${item.item_id}`);
                      dispatch(toggleSideCart());
                    }}>
                      <div className="w-14 h-14 bg-orange-50 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-orange-100 relative">
                         <Image 
                           src={item.image ? `https://lucira.live.ornaverse.in/upload/${item.image}` : "/images/sample.jpg"}
                           alt={item.item_name}
                           fill
                           className="object-cover"
                         />
                      </div>
                      <div className="flex-1 border-b border-gray-50 pb-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-[#EA734D] transition-colors">{item.item_name}</h3>
                        </div>
                        <p className="text-[10px] text-gray-400 mb-2 uppercase">{item.item_code}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-[#EA734D]">₹{Number(item.price || 5000).toLocaleString("en-IN")}</span>
                          <div className="flex items-center gap-3">
                            <button 
                              className="w-6 h-6 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeItem(item.item_id));
                              }}
                            >
                              <Minus size={12}/>
                            </button>
                            <span className="text-sm font-bold">1</span>
                            <button className="text-gray-300 hover:text-gray-600 transition-colors"><Edit2 size={12}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bill Summary */}
              <div className="p-6 border-t bg-gray-50/30 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Items ({cartItems.length})</span>
                    <span className="font-bold text-gray-700">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax (3%)</span>
                    <span className="font-bold text-gray-700">₹{tax.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <Separator className="bg-gray-200 border-dashed border-t h-[1px]" />
                <div className="flex justify-between text-lg font-black">
                  <span className="text-gray-800">Total</span>
                  <span className="text-[#EA734D]">₹{(totalAmount + tax).toLocaleString("en-IN")}</span>
                </div>
                <button className="w-full bg-[#EA734D] text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-orange-100 active:scale-[0.98] transition-transform">
                  Print Bills
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
