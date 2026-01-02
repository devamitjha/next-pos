import React from 'react';
import FooterLogo from "@/assets/footerLogo.png"
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="flex justify-center items-center bg-primary py-8 flex-col space-y-2 mt-10">
      <div className="w-10 mx-auto mb-4">
        <Image src={FooterLogo} width="140" height="40" alt="footer Logo" className="w-full h-full object-cover" priority/>
      </div>
      <p className="text-[10px] text-white">© {new Date().getFullYear()} LUCIRAJEWELRY.COM. ALL RIGHTS RESERVED.</p>
    </div>
  )
}

export default Footer