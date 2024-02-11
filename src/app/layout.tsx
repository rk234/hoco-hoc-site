import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Howard County Hour of Code",
  description: "Howard County Hour of Code, is a 5-day event to promote learning more about computer science!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="flex flex-col w-full h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={`${inter.className} h-full w-full`}>
        <NavBar />
        <section className="mt-14 h-full">
        {children}
        </section>
      </body>
    </html>
  );
}
