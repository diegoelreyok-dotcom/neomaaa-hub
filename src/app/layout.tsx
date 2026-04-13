import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/styles/content.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEOMAAA Hub",
  description: "Portal operativo interno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} font-sans bg-neo-dark text-neo-text-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
