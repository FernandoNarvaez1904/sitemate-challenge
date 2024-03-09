import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Provider } from "jotai";

import { TRPCProvider } from "./_trpc/provider";
import { jotaiStore } from "./jotai";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "A challenge that will get me hired :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="size-full">
      <body className={inter.className + " size-full"}>
        <Provider store={jotaiStore}>
          <TRPCProvider>
            <main className="size-full bg-neutral-50 p-4">{children}</main>
          </TRPCProvider>
        </Provider>
      </body>
    </html>
  );
}
