import React from "react";
import { X } from "lucide-react";
import { Sheet } from "react-modal-sheet";

const SheetWrapper = ({ isOpen, onClose, title, image, children }) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      initialSnap={0.8}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
            <div className="w-full">

              <div className="flex justify-between items-center mb-3 relative h-10">

                {image && (
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto rounded"
                  />
                )}

                <h2 className="text-xl text-center w-full">
                  {title}
                </h2>

                <button
                  onClick={onClose}
                  className="absolute right-4 top-0 w-10 h-10 flex justify-center items-center cursor-pointer"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {children}
            </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onClick={onClose} />
    </Sheet>
  );
};

export default SheetWrapper;
