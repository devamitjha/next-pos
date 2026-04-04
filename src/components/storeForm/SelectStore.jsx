"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStores } from "@/services/useStores";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedStore, setAllStores } from "@/redux/slices/selectedStoreSlice";

export function SelectStore() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, error, isLoading } = useStores();
  const [selectedStoreCode, setSelectedStoreCode] = useState("");

  const stores = data?.Entities ?? [];
   

  const chooseStore = async (e) => {
    e.preventDefault();

    if (!selectedStoreCode) {
      toast.error("Please select a store");
      return;
    }

    // ✅ find full store object
    const storeObj = stores.find(
      (s) => s.company_code === selectedStoreCode
    );

    if (!storeObj) {
      toast.error("Invalid store selected");
      return;
    }

    // ✅ save store in cookie (server)
    await fetch("/api/stores/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        storeCode: storeObj.company_code,
        companyId: storeObj.user_company_id
      }),
    });

    // ✅ save store in Redux (UI)
  
    dispatch(
      setSelectedStore({
        code: storeObj.company_code,
        name: storeObj.mailing_name,
        companyId: storeObj.user_company_id
      })
    );

    dispatch(
      setAllStores(stores)
    );

    router.replace("/jewellery");
  };

  if (isLoading) return <p className="text-center">Loading stores...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load stores</p>;

  return (
    <form className="flex flex-col gap-6" onSubmit={chooseStore}>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl">Select Your Current Store</h1>

        <div className="flex flex-col gap-5 w-full">
          <Select value={selectedStoreCode} onValueChange={setSelectedStoreCode}>
            <SelectTrigger className="w-full h-15!">
              <SelectValue placeholder="Select Store" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Store</SelectLabel>

                {stores.map((store) => (
                  <SelectItem
                    key={store.user_company_id}
                    value={store.company_code}
                    disabled={store.is_disabled}
                  >
                    {store.mailing_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button type="submit" className="h-15 w-full uppercase text-lg cursor-pointer">
            Select
          </Button>
        </div>
      </div>
    </form>
  );
}
