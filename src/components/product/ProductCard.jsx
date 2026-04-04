import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import { Plus, Eye } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({product, index}) => {  
    const router = useRouter();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    
    const imageUrl = `https://lucira.live.ornaverse.in/upload/${product.image}`
    const validImage = imageUrl && imageUrl !== "null" && !imageUrl.endsWith("/null") ? imageUrl : "/images/sample.jpg";
    
    const isAdded = cartItems.find((item) => item.item_id === product.item_id);

    const viewProductDetails = ()=>{
        router.push(`/jewellery/product/${product.item_id}`);
    }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] p-6 flex flex-col items-center gap-4 cursor-pointer shadow-sm border border-gray-50 mb-4 group relative overflow-hidden"
      onClick={viewProductDetails}
    >
        <div className="w-40 h-40 rounded-full bg-[#FDF7F5] flex items-center justify-center p-2 border border-orange-50/50 relative">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full rounded-full overflow-hidden relative shadow-inner"
            >
                <Image
                    src={validImage}
                    alt={product.item_name || "Jewellery"}
                    fill
                    sizes="160px"
                    priority
                    className="object-cover"
                />
            </motion.div>
            
            {/* Quick Actions Overlay on Image */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center gap-2 bg-black/5 rounded-full backdrop-blur-[2px] transition-all"
            >
               <button 
                 className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-md hover:bg-[#EA734D] hover:text-white transition-all transform hover:scale-110"
               >
                 <Eye size={18} />
               </button>
            </motion.div>
        </div>
        
        <div className="text-center space-y-1 w-full z-10">
            <h2 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[2.5rem] flex items-center justify-center px-2">
              {product.item_name || "Jewellery Item"}
            </h2>
            <div className="flex flex-col items-center mb-4">
                <span className="text-lg font-black text-[#EA734D]">
                   {`₹${Number(product.price || 5000).toLocaleString("en-IN")}`}  
                </span>
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    {product.weight ? `${product.weight}g Available` : "In Stock"}
                </span>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-2 w-full pt-2">
               <motion.button 
                 whileTap={{ scale: 0.95 }}
                 onClick={(e) => {
                   e.stopPropagation();
                   if (!isAdded) {
                     dispatch(addItem(product));
                   }
                 }}
                 className={`flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                   isAdded 
                     ? "bg-green-50 text-green-600 cursor-default" 
                     : "bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-200"
                 }`}
               >
                 {isAdded ? "Added" : <><Plus size={14} /> Add</>}
               </motion.button>
               <motion.button 
                 whileTap={{ scale: 0.95 }}
                 className="w-10 h-10 border-2 border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#EA734D] hover:border-orange-100 transition-all"
               >
                 <Eye size={16} />
               </motion.button>
            </div>
        </div>
        
        {/* Subtle Decorative Background Element */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-50/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

export default ProductCard