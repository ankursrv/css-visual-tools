import Icon from "@/components/finpay/Icon";

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1W6yoxBpY2Je4Gt973dqazgvcDHOL2BNT_3-27bWWWxm-m8Q_wmENpC4ibraX9cDB5clk0oDk5B8SuCmOjbFCChq4_jGudVovQPNaG0PL_ph_F27RUZAA4T_uxNhMILD1v2mMo6LWlI9f-TqTCUTTEhOofdwsz88X-_XmhaQMEgh--PZud-B4s9kuZn-vvoaXS376nF6Xj3q7QCTFFTF-4fYO72AD4eO2F_Jva4XO_n2VlQDWwH1Y7F8H0";

export default function MobileHeader({ title }) {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-gutter flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <img alt="Finpay Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase">
              Finpay
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
              {title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Notifications"
            className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors duration-150 relative"
          >
            <Icon name="notifications" className="text-[22px]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary-container" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
