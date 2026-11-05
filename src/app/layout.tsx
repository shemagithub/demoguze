import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CartHost } from "@/components/CartHost";
import "./globals.css";

const display = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "BOTE — Interactive Clothing Rack",
    template: "%s · BOTE",
  },
  description:
    "BOTE streetwear rack: swipe to browse, hover for the front, tap to inspect, pick a size, and add to cart.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <CurrencyProvider>
          <CartProvider>
            {children}
            <CartHost />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
