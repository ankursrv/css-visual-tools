import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Finpay — Next-Gen Treasury Platform",
  description:
    "Get paid early, save automatically all your pay. Simple invoicing, automated treasury yields, powerful gateway integrations, and instant cash flow management for small and medium-sized businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
