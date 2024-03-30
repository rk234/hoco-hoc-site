"use client"
import { useProfile } from "../components/auth-provider/authProvider"

export default function Dashboard() {
  const profile = useProfile()
  return <div className="w-full h-full">
    {profile ?
      <main className="w-full h-full flex flex-col">
        <h1 className="text-3xl font-bold mb-2">Welcome, {profile.displayName}!</h1>
        <hr className="border border-slate-600 mb-4" />
      </main> : "You are not logged in!"}
  </div>
}
