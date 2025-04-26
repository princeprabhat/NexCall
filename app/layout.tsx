import type { Metadata } from "next";
import { dark } from "@clerk/themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexCall",
  description: "Video Calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        // baseTheme: dark,
        variables: {
          colorBackground: "#252A41",
          colorTextOnPrimaryBackground: "white",
          colorInputBackground: "#1C1F2E",
          colorInputText: "white",
          colorTextSecondary: "white",
          colorNeutral: "white",
          colorPrimary: "#0E78F9",
          colorText: "white",
        },
        elements: {
          socialButtonsBlockButton: {
            backgroundColor: "#1C1F2E",
            color: "#ffffff",
          },
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2`}
        >
          <main> {children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
