"use client"

import { useEffect, useState } from "react";
import Hero from "./components/hero/hero";
import StatsCounter from "./components/stats-counter/statsCounter";
import { LiveStats, onStatsChange } from "./services/statsService";
import AboutSection from './components/about/about';
import Faq from './components/faq/faq';

export default function Home() {
  let [stats, setStats] = useState<LiveStats>({ totalHours: 0, totalUsers: 0, totalViews: 0 })

  useEffect(() => {
    console.log("Hello")
    let unsub = onStatsChange((live) => {
      setStats(live)
    })
    return unsub
  }, [])

  return (
    <main className="flex flex-col bg-black">
      <Hero />
      {/*<div id="about" >
        <AboutSection></AboutSection>
      </div>*/}
      <StatsCounter liveStats={stats} className="w-full" />
      <div className="bg-gray-900" id="faq" >
        <Faq></Faq>
      </div>
    </main>
  );
}
