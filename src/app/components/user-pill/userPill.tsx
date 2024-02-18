"use client"

import { getSchoolByID } from "@/app/services/schoolsService"
import { Profile, logout } from "@/app/services/userService"
import { upperCaseFirstLetter } from "@/app/services/utils"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

type Props = {
    user: Profile
}

export default function UserPill(props: Props) {
    let [dropVisible, setDropVisible] = useState(false)

    function toggleDropdown() {
        setDropVisible(!dropVisible)
    }

    function editProfile() {
        //TODO
        console.log("IMPLEMENT PROFILE EDITING!!!")
    }

    return <main className="relative text-sm">
        <div className="flex flex-row items-center gap-2 bg-sky-950 border border-sky-900 text-slate-200 rounded p-2 cursor-pointer hover:bg-sky-900" onClick={() => toggleDropdown()}>
            <p className="select-none">Hello, {props.user.displayName}!</p>
            <button className={`font-mono p-0`}>{dropVisible ? <ChevronUpIcon className="h-4 w-4"/> : <ChevronDownIcon className="h-4 w-4"/> }</button>
        </div>
        {
            dropVisible ?
            <div className="flex flex-col absolute right-0 mt-3 rounded z-10 p-2 bg-gray-800 border-2 border-gray-700 w-72 drop-shadow-md ">
                <p className="font-bold text-lg">{props.user.displayName}</p>
                <p className="mt-1">{getSchoolByID(props.user.school).name}</p>
                <p className="mt-1">Default Language: <span className="font-bold">{upperCaseFirstLetter(props.user.preferredLanguage)}</span></p>
                <button className={`font-mono bg-slate-700 hover:bg-slate-600 rounded text-slate-200 p-1 w-full mt-3`} onClick={editProfile}>Edit Profile</button>
                <button className={`font-mono bg-slate-700 hover:bg-slate-600 rounded text-slate-200 p-1 w-full mt-1`} onClick={logout}>Logout</button>
            </div> : ""
        }
    </main>
}