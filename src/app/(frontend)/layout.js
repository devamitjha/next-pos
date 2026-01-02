import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function SiteLayout({ children }) {
  return (
    <div className="h-full w-full font-poppins">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
