"use client";
import React from 'react'
import { Menu, ChevronDown, Store, Search, ScanBarcode, ShoppingBag   } from 'lucide-react';
import { Avatar,  AvatarFallback,  AvatarImage,} from "@/components/ui/avatar";
import { useInitials } from '@/hooks/useInitials';
import LogoSmall from "@/assets/images/logo-small.png";
import Link from 'next/link';
import Image from 'next/image';
import SheetWrapper from '../bottomSheet/SheetWrapper';
import { useSelector, useDispatch } from "react-redux";
import StoreList from '../storeAddress/storeAddress';
import { UserLogin } from '../Auth/UserLogin';
import { Register } from '../Auth/Register';
import { VerifyOTP } from '../Auth/VerifyOTP';
import { switchSheet,  setSheetAfterDelay} from '@/redux/slices/sheetSlice'

const Header = () => { 
  const userNme = { name: "Amit Jha", avatar: "" };
  const initials = useInitials(userNme?.name);
  const selectedStore = useSelector((state) => state.selectedStore.store);
  const selectedStoreName = selectedStore?.name

  const dispatch = useDispatch();
  const activeSheet = useSelector((state) => state.sheet.activeSheet)

  const openSheet = (sheetName) => {
    dispatch(switchSheet())
    setTimeout(() => {
      dispatch(setSheetAfterDelay(sheetName))
    }, 100)
  }
 
  const closeSheet = () => {
    dispatch(switchSheet()) 
  }

  return (
    <>
      <div className="w-full bg-white px-10 pb-10 pt-4">
        <header className="flex justify-between items-center h-15">
          <div className="menu-left w-1/2 flex justify-start items-center gap-4">  
            <div className="flex justify-center items-center cursor-pointer">
              <Menu size={20} strokeWidth={1}/>     
            </div>     
            <Link className="logo w-20 overflow-hidden cursor-pointer" href="/jewellery">
              <Image
                src={LogoSmall}
                width="86"
                height="22"
                alt="lucira"
                priority
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          <div className="menu-right w-1/2 flex justify-end items-center gap-4">
            <div className="user-n-cart flex gap-4">
              <div className="flex items-center justify-between w-75 border border-black rounded-lg px-4 py-2 bg-white flex-1 cursor-pointer" onClick={() => openSheet('storeList')}>
                <div className="flex items-center gap-2">
                  <Store size={18} strokeWidth={1} />
                  <span className="text-sm whitespace-nowrap">{selectedStoreName || "Chembur Store"}</span>
                </div>
                <ChevronDown size={18} strokeWidth={1} />
              </div>
              <div className="flex items-center gap-4">              
                <Link href="/checkout/cart" className="w-9 h-9 flex justify-center items-center relative">
                  <ShoppingBag size={22} strokeWidth={1.25}/>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand text-white rounded-full flex justify-center items-center text-[12px]">
                    1
                  </span>
                </Link>
                <Avatar className="w-9 h-9 text-sm cursor-pointer" onClick={() => openSheet('login')}>
                  <AvatarImage src={userNme.avatar} alt={userNme.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>      
          <div className="header-secondary w-full mt-5">
            <h2 className="text-md mb-2">Search Product</h2>
              <div className="flex w-full h-10 relative border border-black rounded-md overflow-hidden bg-white">
                <span className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
                  <Search size={16} strokeWidth={1} />
                </span>
                <input type="text" placeholder="Search For Product" className="w-full h-full pl-10 pr-10 text-sm outline-none"/>
                <span className="absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
                  <ScanBarcode size={16} strokeWidth={1} />
                </span>
              </div>
          </div>
      </div>
      <SheetWrapper
        isOpen={activeSheet === 'storeList'}
        onClose={closeSheet}
        title="All Nearest Stores"
      >
        <StoreList onClose={closeSheet}/>
      </SheetWrapper>
      <SheetWrapper
        isOpen={activeSheet === 'login'}
        onClose={closeSheet}
        title="User Login"
      >
       <UserLogin openSheet={openSheet}/>
      </SheetWrapper>
      <SheetWrapper
        isOpen={activeSheet === 'register'}
        onClose={closeSheet}
        title="Register User"
      >
       <Register openSheet={openSheet}/>
      </SheetWrapper>
      <SheetWrapper
        isOpen={activeSheet === 'verifyOTP'}
        onClose={closeSheet}
        title="Verify OTP"
      >
       <VerifyOTP/>
      </SheetWrapper>
    </>
  );
};

export default Header;
