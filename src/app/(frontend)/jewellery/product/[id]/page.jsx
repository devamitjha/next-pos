"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ScanBarcode, 
  Search, 
  CreditCard, 
  Wallet, 
  Gift, 
  ShieldCheck, 
  ChevronRight,
  Info,
  User as UserIcon,
  Phone,
  Tag,
  Percent,
  Calendar,
  Star,
  ArrowLeft,
  X,
  Maximize2,
  Share2,
  ZoomIn
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex gap-8 animate-pulse p-6">
        <div className="w-1/4 aspect-square bg-gray-200 rounded-[2rem]" />
        <div className="w-3/4 space-y-6">
          <div className="h-10 bg-gray-200 rounded-xl w-3/4" />
          <div className="h-40 bg-gray-200 rounded-2xl w-full" />
          <div className="h-60 bg-gray-200 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
        <p className="text-xl font-bold">Product Not Found</p>
      </div>
    );
  }

  const price = product.price || 5000;
  const tax = price * 0.03;
  const payable = price + tax;
  const imageUrl = product.image ? `https://lucira.live.ornaverse.in/upload/${product.image}` : "/images/sample.jpg";
  
  const allImages = product.shopify_images?.length > 0 
    ? product.shopify_images.map(img => img.url) 
    : [imageUrl];

  const nextImage = (e) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = (e) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const toggleZoom = (e) => {
    e?.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-32 relative px-6">
      {/* LEFT: Product Image Section */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <div className="sticky top-24">
          <div 
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 flex items-center justify-center relative overflow-hidden group cursor-zoom-in"
            onClick={() => {
              setCurrentImageIndex(0);
              setIsLightboxOpen(true);
            }}
          >
            <div className="absolute inset-0 bg-[#FDF7F5]/30 group-hover:scale-110 transition-transform duration-700" />
            <div className="w-full aspect-square relative z-10 drop-shadow-xl">
              <Image 
                src={allImages[0]}
                alt={product.item_name}
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 z-20">
               <div className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg">
                  <Maximize2 size={20} className="text-gray-800" />
               </div>
            </div>
          </div>

          <button 
            onClick={() => setIsLightboxOpen(true)}
            className="mt-4 w-full py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-[#EA734D] hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
          >
            +{allImages.length > 1 ? allImages.length - 1 : 5} Images More
          </button>
        </div>
      </div>

      {/* RIGHT: Billing Area */}
      <div className="w-full lg:w-3/4 flex flex-col gap-6">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-[1.8] bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 flex flex-col justify-between">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Pieces</span>
                <span className="text-base font-black text-gray-800">1</span>
              </div>
              <div className="flex flex-col gap-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Nt. Weight</span>
                <span className="text-base font-black text-gray-800">{product.net_weight || "0.00"}</span>
              </div>
              <div className="flex flex-col gap-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Gr. Weight</span>
                <span className="text-base font-black text-gray-800">{product.weight || "0.00"}</span>
              </div>
              <div className="flex flex-col gap-0.5 border-b border-gray-50 pb-2 text-orange-400">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Round Off</span>
                <span className="text-base font-black italic">₹ 0.44</span>
              </div>
              <div className="flex flex-col gap-0.5 pt-2">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Subtotal</span>
                <span className="text-base font-black text-gray-800">₹{price.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex flex-col gap-0.5 pt-2 text-red-400">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Discount</span>
                <span className="text-base font-black italic">₹ 0.00</span>
              </div>
              <div className="flex flex-col gap-0.5 pt-2 text-green-600">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Payable</span>
                <span className="text-base font-black">₹{payable.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex flex-col gap-0.5 pt-2">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Payments</span>
                <span className="text-base font-black text-gray-800">₹ 0.00</span>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between items-end">
               <div className="flex flex-col">
                  <span className="text-gray-400 font-black text-[9px] uppercase tracking-[0.2em] mb-1">Amount Due</span>
                  <span className="text-4xl font-black text-[#EA734D] tracking-tighter">₹{payable.toLocaleString("en-IN")}</span>
               </div>
               <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase border border-green-100 animate-pulse tracking-widest">Ready</div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
             <button className="flex-1 bg-white hover:bg-orange-50 border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-4 transition-all group shadow-sm border-l-4 border-l-[#EA734D]">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#EA734D] group-hover:scale-110 transition-transform"><Tag size={18} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Select Promotion</span>
             </button>
             <button className="flex-1 bg-white hover:bg-blue-50 border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-4 transition-all group shadow-sm border-l-4 border-l-blue-500">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><ScanBarcode size={18} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Scan Vouchers</span>
             </button>
             <button className="flex-1 bg-white hover:bg-purple-50 border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-4 transition-all group shadow-sm border-l-4 border-l-purple-500">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform"><Percent size={18} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Scan Promo</span>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8">
           <div className="col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 space-y-6">
              <div className="flex justify-between text-xs border-b border-gray-50 pb-4">
                 <span className="text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><Calendar size={14}/> Birthday</span>
                 <span className="text-gray-800 font-black">-</span>
              </div>
              <div className="flex justify-between text-xs border-b border-gray-50 pb-4">
                 <span className="text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><Star size={14}/> Anniversary</span>
                 <span className="text-gray-800 font-black">-</span>
              </div>
              <div className="flex justify-between text-xs border-b border-gray-50 pb-4">
                 <span className="text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={14}/> Loyalty Points</span>
                 <span className="text-gray-800 font-black">0</span>
              </div>
              <div className="flex justify-between text-xs pt-2">
                 <span className="text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><Wallet size={14}/> Credit Balance</span>
                 <span className="text-gray-800 font-black">₹ 0.00</span>
              </div>
           </div>

           <div className="col-span-3 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-50 flex items-center gap-4 shadow-sm group focus-within:border-orange-100 transition-all">
                 <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EA734D]"><Tag size={20} /></div>
                 <div className="flex-1">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Additional Discount</label>
                    <input type="text" placeholder="Enter amount or %" className="w-full text-base font-bold text-gray-800 outline-none" />
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white rounded-2xl p-5 border border-gray-50 flex items-center gap-4 shadow-sm focus-within:border-orange-100 transition-all">
                    <Phone size={18} className="text-gray-400" />
                    <input type="text" defaultValue="9967175225" className="w-full text-sm font-bold text-gray-800 outline-none" />
                 </div>
                 <div className="bg-white rounded-2xl p-5 border border-gray-50 flex items-center gap-4 relative shadow-sm focus-within:border-orange-100 transition-all">
                    <UserIcon size={18} className="text-[#EA734D]" />
                    <select className="w-full text-sm font-bold text-gray-800 outline-none appearance-none bg-transparent">
                       <option>Amit Jha</option>
                    </select>
                    <ChevronRight size={16} className="absolute right-5 text-gray-300 rotate-90" />
                 </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-50 flex items-center gap-4 relative shadow-sm focus-within:border-orange-100 transition-all">
                 <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white text-[10px] font-black">ABC</div>
                 <div className="flex-1 border-l border-gray-100 pl-4 ml-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sales Person</label>
                    <select className="w-full text-sm font-bold text-gray-800 outline-none appearance-none bg-transparent">
                       <option>ABC Sales Executive</option>
                    </select>
                 </div>
                 <ChevronRight size={16} className="absolute right-5 text-gray-300 rotate-90" />
              </div>
           </div>
        </div>

        <div className="fixed bottom-0 right-0 w-[calc(100%-5rem)] px-10 pb-8 pt-12 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5] to-transparent z-40">
           <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-white flex justify-center items-center gap-6 w-full">
              <button className="flex-1 max-w-[240px] h-20 bg-gray-900 text-white rounded-3xl flex flex-col items-center justify-center gap-1 hover:bg-black transition-all active:scale-95 group shadow-xl shadow-gray-200">
                 <CreditCard size={24} className="group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Complete Payment</span>
              </button>
              <button className="flex-1 max-w-[240px] h-20 bg-blue-50 text-blue-600 rounded-3xl flex flex-col items-center justify-center gap-1 hover:bg-blue-100 transition-all active:scale-95 group">
                 <Wallet size={24} className="group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Apply Credits</span>
              </button>
              <button className="flex-1 max-w-[240px] h-20 bg-orange-50 text-[#EA734D] rounded-3xl flex flex-col items-center justify-center gap-1 hover:bg-orange-100 transition-all active:scale-95 group">
                 <Gift size={24} className="group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Gifts & Loyalty</span>
              </button>
              <button className="flex-1 max-w-[240px] h-20 bg-purple-50 text-purple-600 rounded-3xl flex flex-col items-center justify-center gap-1 hover:bg-purple-100 transition-all active:scale-95 group">
                 <ShieldCheck size={24} className="group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Redeem Scheme</span>
              </button>
           </div>
        </div>
      </div>

      {/* CUSTOM DESIGN LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center backdrop-blur-sm overflow-hidden"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Bar */}
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
               <div className="text-white/80 font-black text-sm uppercase tracking-[0.3em] italic">
                  {currentImageIndex + 1} <span className="text-white/20 mx-2">/</span> {allImages.length}
               </div>
               <div className="flex items-center gap-2">
                  <button onClick={toggleZoom} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isZoomed ? "bg-[#EA734D] text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}>
                    <ZoomIn size={24} />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"><Maximize2 size={20} /></button>
                  <button 
                    onClick={() => setIsLightboxOpen(false)}
                    className="ml-4 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all"
                  >
                    <X size={24} />
                  </button>
               </div>
            </div>

            {/* Navigation Arrows - Only show if NOT zoomed */}
            {!isZoomed && (
              <>
                <button onClick={prevImage} className="absolute left-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/10 transition-all z-50 group">
                   <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={32} />
                </button>
                <button onClick={nextImage} className="absolute right-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/10 transition-all z-50 group">
                   <ChevronRight className="group-hover:translate-x-1 transition-transform" size={32} />
                </button>
              </>
            )}

            {/* Main Image Container */}
            <div 
              className={`w-full h-full flex items-center justify-center p-10 transition-all duration-500 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={toggleZoom}
            >
               <motion.div 
                 key={currentImageIndex}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ 
                   opacity: 1, 
                   scale: isZoomed ? 1.8 : 1,
                   y: 0
                 }}
                 transition={{ duration: 0.4, type: "spring", damping: 25 }}
                 className="relative w-full h-full max-w-5xl aspect-square"
               >
                  <Image 
                    src={allImages[currentImageIndex]} 
                    alt="Lightbox" 
                    fill 
                    className="object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.15)]" 
                  />
               </motion.div>
            </div>

            {/* Help Text */}
            <div className="absolute bottom-8 text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
               Click image to {isZoomed ? "zoom out" : "zoom in"} • Scroll to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
