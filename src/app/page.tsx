import Hero from "./components/hero/hero";
import AboutSection from './components/about/about';
import "./globals.css";
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col bg-sky-950">
      <Hero />
      <div className="mb-20" id="about" >
        <AboutSection></AboutSection>
      </div>
      {/* <div className="bg-sky-300 mb-20" id="faq" >
        FAQ
      </div> */}
    </main>
  );
}
