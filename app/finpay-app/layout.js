import BottomNav from "@/components/finpay/BottomNav";

export const metadata = {
  title: "Finpay — Mobile App",
  description:
    "Finpay treasury companion app: dashboard, cards, transfers and analytics.",
};

export default function FinpayAppLayout({ children }) {
  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-surface-container-high via-surface-container-low to-surface flex justify-center">
      {/* Responsive phone frame: full-bleed on phones, centered device-like column on larger screens */}
      <div className="relative w-full max-w-[430px] min-h-dvh bg-surface shadow-2xl">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
