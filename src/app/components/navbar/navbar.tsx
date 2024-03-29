"use client"

import { signInOrRegister } from "@/app/services/userService"
import Link from "next/link"
import { useProfile } from "../auth-provider/authProvider"
import UserPill from "../user-pill/userPill"

export default function NavBar() {
    let profile = useProfile()

    return (
        <main className="bg-slate-900 bg-opacity-50 backdrop-blur-md h-14 p-2 flex flex-row items-center justify-center border-b-2 border-b-sky-900 top-0 sticky z-30 w-full">
            <div className="flex flex-row items-center w-full max-w-screen-xl">
                <Link className={`font-mono text-sky-300 text-xl md:text-2xl font-bold`} href={"/"}>&lt;HocoHOC/&gt;</Link>
                <div className="flex-1"></div>
                <div className="flex flex-row text-xs gap-5 md:text-md items-stretch">
                    <Link className={`font-mono rounded text-sm items-center justify-center hidden md:flex font-bold hover:text-sky-300 hover:underline`} href={"/articles"}>Articles</Link>
                    <Link className={`font-mono rounded text-sm items-center justify-center hidden md:flex font-bold hover:text-sky-300 hover:underline`} href={"/leaderboard"}>Leaderboard</Link>
                    {
                        profile ? <UserPill user={profile} />
                            :
                            <button className={`font-mono btn-primary`} onClick={() => signInOrRegister()}>Login</button>
                    }
                </div>
            </div>
        </main>
    )
}
