import Storebg from "@/assets/images/store-bg.jpg";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { SelectStore } from "@/components/storeForm/SelectStore";

export default function StorePage() {
  return (
    <div
      className="grid min-h-svh bg-cover bg-center"
      style={{ backgroundImage: `url(${Storebg.src})` }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col justify-between bg-white p-15 rounded-2xl shadow-lg w-full max-w-115 mx-auto gap-20">
          <Image src={Logo.src} alt="lucira" className="mx-auto" width={200} height={51} priority/>
          <SelectStore />
        </div>
      </div>
    </div>
  );
}
