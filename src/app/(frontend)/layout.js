export default function SiteLayout({ children }) {
  return (
    <div className="h-full w-full font-poppins">
      <main>{children}</main>
    </div>
  );
}
