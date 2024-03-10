"use client"

import { useEffect, useState } from "react";
import Hero from "./components/hero/hero";
import StatsCounter from "./components/stats-counter/statsCounter";
import { LiveStats, onStatsChange } from "./services/statsService";

export default function Home() {
  let [stats, setStats] = useState<LiveStats>({totalHours: 0, totalUsers: 0, totalViews: 0})

  useEffect(() => {
    console.log("Hello")
    let unsub = onStatsChange((live) => {
      setStats(live)
    })
    return unsub
  }, [])
  
  return (
    <main className="flex flex-col bg-sky-950">
      <Hero />
      <StatsCounter liveStats={stats} className="w-full"/>
    </main>
  );
}
