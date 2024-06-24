import type { Metadata } from "next";
import "./globals.css";

import ReactQueryPvorider from "@/app/StateManagement/Provider";
import { Aside } from "@/app/Components/Organisms";

export const metadata: Metadata = {
  title: "Swap currency",
  description: "Swap between two currency",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" className="">
      <body className="bg-white dark:bg-gray-800">
        <ReactQueryPvorider>
          <div className="container mx-auto px-4 py-4 md:px-0 md:py-8">
            <div className="grid grid-cols-12 gap-0 md:gap-6">
              <div className="col-span-12 md:col-span-8">
                <main className="container mx-auto">{children}</main>
              </div>
              <div className="col-span-12 md:col-span-4 py-4 md:py-0">
                <Aside />
              </div>
            </div>
          </div>
        </ReactQueryPvorider>
      </body>
    </html>
  );
}
