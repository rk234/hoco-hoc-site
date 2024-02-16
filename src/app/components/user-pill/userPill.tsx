"use client"

import { logout } from "@/app/services/userService"
import { JetBrains_Mono } from "next/font/google"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { User } from "firebase/auth"

const jbm = JetBrains_Mono({subsets: ["latin"]})

type Props = {
    user: User
}

export default function UserPill(props: Props) {
    let [dropVisible, setDropVisible] = useState(false)

    function toggleDropdown() {
        setDropVisible(!dropVisible)
    }

    return <main className="relative text-sm">
        <div className="flex flex-row items-center gap-2 bg-sky-950 border border-sky-900 text-slate-200 rounded p-2">
            <p>Hello, {props.user.displayName}!</p>
            <button className={`${jbm.className} p-0`} onClick={() => toggleDropdown()}>{dropVisible ? <ChevronUpIcon className="h-4 w-4"/> : <ChevronDownIcon className="h-4 w-4"/> }</button>
        </div>
        {
            dropVisible ?
            <div className="flex flex-col gap-2 absolute mt-3 rounded z-10 p-2 bg-slate-800 w-full drop-shadow-md ">
                <p>Profile Menu</p>
                <hr />
                <button className={`${jbm.className} bg-slate-700 hover:bg-slate-600 rounded text-slate-200 p-1 w-full`} onClick={logout}>Logout</button>
            </div> : ""
        }
    </main>
}