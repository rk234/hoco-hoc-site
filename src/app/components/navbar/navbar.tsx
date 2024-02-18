"use client"

import Link from "next/link"
import { signInOrRegister } from "@/app/services/userService"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "@/app/firebase/config"
import UserPill from "../user-pill/userPill"
import { useProfile } from "../auth-provider/authProvider"

export default function NavBar() {
    let profile = useProfile()

    return (
        <main className="bg-slate-900 h-14 p-2 flex flex-row items-center border-b-2 border-b-sky-900 fixed z-30 w-full">
            <Link className={`font-mono text-sky-300 text-xl md:text-2xl font-bold flex-1`} href={"/"}>&lt;HocoHOC/&gt;</Link>
            
            <div className="flex flex-row text-xs gap-5 md:text-md items-stretch pr-1">
                <Link className={`font-mono rounded text-sm items-center justify-center hidden md:flex hover:text-sky-300 hover:underline`} href={"/articles"}>Articles</Link>
                <Link className={`font-mono rounded text-sm items-center justify-center hidden md:flex hover:text-sky-300 hover:underline`} href={"/leaderboard"}>Leaderboard</Link>
                {//TODO: Move this stuff to another component later!
                    profile ? <UserPill user={profile} />
                    :
                    <button className={`font-mono btn-primary`} onClick={() => signInOrRegister()}>Login</button>
                }
            </div>
        </main>
    )
}