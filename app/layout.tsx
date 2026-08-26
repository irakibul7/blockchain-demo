import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@/app/globals.css";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Rakibul Islam", url: "https://therakibul.me" }],
  creator: "Rakibul Islam",
  publisher: "Rakibul Islam",
  category: "education",
  keywords: [
    "blockchain glossary",
    "blockchain simulator",
    "proof of work",
    "cryptographic hash",
    "blockchain education",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    url: siteConfig.url,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1730,
        height: 909,
        alt: "Blockchain Field Guide with a linked-block timeline",
      },
    ],
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    card: "summary_large_image",
    creator: "@rkshuvo007",
    images: [
      {
        url: "/twitter-image.png",
        alt: "Blockchain Field Guide with a linked-block timeline",
      },
    ],
  },
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
