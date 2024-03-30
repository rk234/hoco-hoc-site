"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MeNav() {
  const path = usePathname()
  return <aside className="w-full h-full md:w-52 flex flex-col gap-2">
    <Link href="/me/" className={`p-3 rounded hover:bg-slate-700 ${path == "/me" && "bg-slate-800"}`}> Dashboard </Link>
    <Link href="/me/settings" className={`p-3 rounded hover:bg-slate-700 ${path == "/me/settings" && "bg-slate-800"}`}> Settings </Link>
    <Link href="/me/help" className={`p-3 rounded hover:bg-slate-700 ${path == "/me/help" && "bg-slate-800"}`}> Help </Link>
    <div className="flex-1"></div>
    <button className="btn-danger p-3 rounded font-mono text-left"> Logout </button>
  </aside>
}
