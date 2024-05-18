"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useProfile } from "../components/auth-provider/authProvider"
import { logout, signInOrRegister } from "../services/userService"

export default function MeNav() {
  const path = usePathname()
  const profile = useProfile()

  return <aside className="w-full h-full md:w-52 flex flex-col gap-2">
    <Link href="/me/" className={`p-3 rounded hover:bg-slate-700 ${path == "/me" && "bg-slate-800"}`}> Dashboard </Link>
    <Link href="/me/settings" className={`p-3 rounded hover:bg-slate-700 ${path == "/me/settings" && "bg-slate-800"}`}> Settings </Link>
    <Link href="/me/help" className={`p-3 rounded hover:bg-slate-700 ${path == "/me/help" && "bg-slate-800"}`}> Help </Link>
    <div className="flex-1"></div>
    {profile ? <button className="btn-danger p-3 rounded font-mono text-left" onClick={logout}>Log out </button>
      : <button className="btn-primary p-3 rounded font-mono text-left" onClick={signInOrRegister}> Log in </button>}
  </aside>
}
