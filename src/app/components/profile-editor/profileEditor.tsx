"use client"

import { Profile } from "@/app/services/userService"
import { ALL_LANGUAGES } from "@/app/services/utils"
import { useState } from "react"

type Props = {
    profile: Profile
    onSave: (profile: Profile) => void
    onCancel: () => void
    className?: string
    disabled: boolean
}

export default function ProfileEditor(props: Props) {
    let [profile, setProfile] = useState<Profile>(props.profile)

    return <main className={`flex flex-col ${props.className || ""}`}>
        <h1 className="font-bold font-mono text-2xl">Edit Your Profile</h1>
        <div className="my-2">
            <p className="font-bold text-md">Select your preferred programming language</p>
            <p className="text-sm text-slate-300">This is the language you will see code examples in by default (when they are available in that language).</p>    
        </div>
        <select className="font-mono bg-gray-700 p-2 rounded border-2 border-gray-600 hover:bg-gray-600 w-full cursor-pointer" value={ALL_LANGUAGES.indexOf(profile.preferredLanguage.toLowerCase())} onChange={(e) => {setProfile({...profile, preferredLanguage: ALL_LANGUAGES[e.target.value]})}}>
            {ALL_LANGUAGES.map((lang, index) => 
                <option key={index} value={index}>{lang}</option> 
            )}
        </select>
        
        <div className="mt-2 flex gap-2">
            <button className="btn-primary font-mono flex-1" disabled={props.disabled} onClick={() => props.onSave(profile)}>Save</button>
            <button className="btn-secondary font-mono" disabled={props.disabled} onClick={props.onCancel}>Cancel</button>
        </div>
    </main>
}