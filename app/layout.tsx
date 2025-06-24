import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecurHUB - Lider w Cyberbezpieczeństwie dla Firm | Pentesty, Audyty",
  description: "SecurHUB to elitarna platforma cybersecurity dla dużych przedsiębiorstw. Oferujemy kompleksowe usługi: pentesty aplikacji webowych i mobilnych, audyty kodu źródłowego, testy socjotechniczne oraz audyty zgodności z ISO 27001, DORA i NIS2. Zaufaj ekspertom z ponad 25-letnim doświadczeniem.",
  keywords: "cyberbezpieczeństwo, pentesty, testy penetracyjne, audyt bezpieczeństwa, bezpieczeństwo IT, ochrona danych, ISO 27001, DORA, NIS2, audyt kodu, inżynieria społeczna, OWASP Top 10, DevSecOps, SecurHUB",
  openGraph: {
    title: "SecurHUB - Lider w Cyberbezpieczeństwie dla Firm | Pentesty, Audyty",
    description: "Kompleksowe usługi cybersecurity dla dużych przedsiębiorstw: pentesty, audyty kodu, testy socjotechniczne, zgodność z ISO 27001, DORA, NIS2.",
    url: "https://www.securhub.pl",
    images: [
      {
        url: "https://i.ibb.co/j9T7prmF/logo.png",
        width: 800,
        height: 600,
        alt: "SecurHUB Logo",
      },
    ],
    siteName: "SecurHUB",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecurHUB - Lider w Cyberbezpieczeństwie dla Firm | Pentesty, Audyty",
    description: "Zabezpiecz swoją firmę z SecurHUB. Oferujemy pentesty, audyty kodu, testy socjotechniczne i zgodność z ISO 27001, DORA, NIS2. Ponad 25 lat doświadczenia.",
    images: ["https://i.ibb.co/j9T7prmF/logo.png"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.securhub.pl",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
