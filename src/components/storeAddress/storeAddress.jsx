"use client";

import React from "react";
import { Navigation } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStore } from "@/redux/slices/selectedStoreSlice";

const StoreList = ({ onClose }) => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.selectedStore.allStores);
  const selectedStore = useSelector((state) => state.selectedStore.store);

  const handleSelect = async (store) => {
    await fetch("/api/stores/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeCode: store.company_code }),
    });

    dispatch(setSelectedStore(store));
    onClose?.();
  };

  return (
    <div className="mt-4 divide-y">
      {stores.map((store) => (
        <div
          key={store.company_id}
          onClick={() => handleSelect(store)}
          className={`py-6 px-6 flex justify-between cursor-pointer
            ${selectedStore?.company_code === store.company_code ? "bg-gray-100" : "bg-white"}
          `}
        >
          <div>
            <h3 className="text-lg">{store.mailing_name}</h3>
          </div>
          <Navigation size={18} />
        </div>
      ))}
    </div>
  );
};

export default StoreList;
