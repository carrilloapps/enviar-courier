import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ClientBody from "./client-body";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enviar Courier | Envíos de Colombia a Venezuela",
  description:
    "Envíos internacionales seguros desde Colombia a Venezuela. Casillero internacional, rastreo en tiempo real, tarifas competitivas. ¡Cotiza tu envío ahora!",
  keywords:
    "envíos a Venezuela, courier Colombia Venezuela, casillero internacional, rastreo de paquetes, envíos desde Colombia a Venezuela",
  openGraph: {
    title: "Enviar Courier | Envíos internacionales a Venezuela",
    description:
      "Servicio de courier puerta a puerta con rastreo en tiempo real. Casillero internacional, tarifas competitivas y entrega garantizada.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
