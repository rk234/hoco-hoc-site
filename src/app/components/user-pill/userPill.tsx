"use client"

import { getSchoolByID } from "@/app/services/schoolsService"
import { Profile, logout, updateUserProfile } from "@/app/services/userService"
import { upperCaseFirstLetter } from "@/app/services/utils"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import ModalContainer from "../modal/modalContainer"
import Modal from "../modal/modal"
import ProfileEditor from "../profile-editor/profileEditor"
import { useProfileUpdate } from "../auth-provider/authProvider"
import Link from "next/link"

type Props = {
    user: Profile
}

export default function UserPill(props: Props) {
    let [dropVisible, setDropVisible] = useState(false)

    function toggleDropdown() {
        setDropVisible(!dropVisible)
    }

    return <main className="relative text-sm">
        <div className="flex select-none flex-row items-center gap-2 bg-slate-800 border border-slate-700 text-slate-200 rounded p-2 cursor-pointer hover:bg-slate-700" onClick={() => toggleDropdown()}>
            <p>Hello, {props.user.displayName}!</p>
            {props.user.admin && <span className="font-mono text-xs bg-amber-400 text-slate-900 p-1 rounded-sm">ADMIN</span>}
            <button className={`font-mono p-0`}>{dropVisible ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}</button>
        </div>
        {
            dropVisible ?
                <div className="flex flex-col absolute right-0 mt-3 rounded z-10 p-2 bg-slate-800 border border-gray-700 w-80 drop-shadow-md ">
                    <p className="font-bold text-lg">{props.user.displayName}</p>
                    <p className="mt-1">{getSchoolByID(props.user.school).name}</p>
                    <Link className={`font-mono bg-slate-700 hover:bg-slate-600 rounded text-slate-200 p-1 w-full mt-3 text-center`} onClick={() => setDropVisible(false)} href="/me">Go to Dashboard</Link>
                    <button className={`font-mono bg-slate-700 hover:bg-slate-600 rounded text-slate-200 p-1 w-full mt-1`} onClick={logout}>Logout</button>
                </div> : ""
        }
    </main>
}
