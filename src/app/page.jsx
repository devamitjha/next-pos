import Storebg from "@/assets/images/store-bg.jpg";
import Logo from "@/assets/images/logo.png";
import { LoginForm } from "@/components/loginForm/login-form";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="grid min-h-svh bg-cover bg-center"
      style={{ backgroundImage: `url(${Storebg.src})` }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col justify-between bg-white px-15 py-20 rounded-2xl shadow-lg w-full max-w-155 mx-auto gap-20">
          <Image src={Logo.src} alt="lucira" className="mx-auto" width={460} height={118} priority/>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
