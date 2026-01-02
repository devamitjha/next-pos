"use client";
import React, { useEffect, useState } from "react";
import { X, Navigation } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStore } from "@/redux/slices/selectedStoreSlice";

const stores = [
  {
    name: "Infiniti Mall",
    place:"Malad West",
    address: "First Floor, Infinity Mall Malad Mumbai - 401101",
    phone: "4387483282",
    distance: "12KM",
  },
  {
    name: "Inorbit Mall",
    place:"Malad West",
    address: "First Floor, Infinity Mall Malad Mumbai - 401101",
    phone: "4387483282",
    distance: "13KM",
  },
  {
    name: "Maxus Mall",
    place:"Malad West",
    address: "First Floor, Infinity Mall Malad Mumbai - 401101",
    phone: "4387483282",
    distance: "14KM",
  },
  {
    name: "Thakur Mall",
    place:"Malad West",
    address: "First Floor, Infinity Mall Malad Mumbai - 401101",
    phone: "4387483282",
    distance: "15KM",
  },
];

const StoreList = ({ onClose }) => {
    const dispatch = useDispatch();
    // Get selected store from Redux
    const selectedStore = useSelector((state) => state.selectedStore.store);

    // Local index state for UI highlight
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Set selected index when component loads (persist highlight)
    useEffect(() => {
        if (selectedStore) {
        const index = stores.findIndex(
            (store) => store.name === selectedStore.name
        );
        if (index !== -1) setSelectedIndex(index);
        }
    }, [selectedStore]);

    const handleSelect = (store, index) => {
        setSelectedIndex(index);

        // Save store to Redux (persist)
        dispatch(setSelectedStore(store));

        // Close modal/sheet
        onClose && onClose();
    };

  return ( 
      <div className="mt-4 divide-y">
        {stores.map((store, index) => (
          <div
            key={index}
            onClick={() => handleSelect(store, index)}
            className={`py-6 px-6 flex justify-between items-center cursor-pointer transition 
              ${selectedIndex === index ? "bg-gray-100" : "bg-white"}
            `}
          >
            {/* Left Side Text */}
            <div>
              <h3 className="text-lg text-gray-800 mb-2">{store.name}, {store.place}</h3>
              <p className="text-sm text-gray-600 mb-1">{store.address}</p>
              <p className="text-sm text-gray-600">Phone - {store.phone}</p>
            </div>

            {/* Right Side: Icon + Distance */}
            <div className="flex items-center gap-2 text-gray-700">
              <Navigation size={18} strokeWidth={1.5} />
              <span className="text-sm">{store.distance}</span>
            </div>
          </div>
        ))}
      </div>
  );
};

export default StoreList;
