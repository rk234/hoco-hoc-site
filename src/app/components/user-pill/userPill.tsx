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

type Props = {
    user: Profile
}

export default function UserPill(props: Props) {
    let [dropVisible, setDropVisible] = useState(false)
    let [edit, setEdit] = useState(false)
    let [working, setWorking] = useState(false)
    let [error, setError] = useState(false)
    let setProfile = useProfileUpdate()

    function toggleDropdown() {
        setDropVisible(!dropVisible)
    }

    function editProfile() {
        setEdit(true)
    }

    function handleEdit(profile: Profile) {
        setWorking(true)
        updateUserProfile(profile.uid, profile.preferredLanguage).then(() => {
            setEdit(false)
            setWorking(false)
            setProfile(profile)
            console.log("UPDATED!")
            setDropVisible(false)
        }).catch((err) => {
            console.log(error)
            setWorking(false)
            setError(true)
        })
    }

    return <main className="relative text-sm">
        {edit && 
        <ModalContainer>
            <Modal>
                {error ? 
                    <div>
                        <h1 className={`font-mono text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
                        <p className="mb-4">An error occured while updating your profile. Try again later or contact us if the problem persists.</p>                
                        <button className="btn-secondary font-mono" onClick={() => setEdit(false)}>Close</button>
                    </div>
                : 
                <ProfileEditor disabled={working || error} profile={props.user} onSave={handleEdit} onCancel={() => setEdit(false)} />}
            </Modal>
        </ModalContainer>
        }
        <div className="flex select-none flex-row items-center gap-2 bg-sky-950 border border-sky-900 text-slate-200 rounded p-2 cursor-pointer hover:bg-sky-900" onClick={() => toggleDropdown()}>
            <p>Hello, {props.user.displayName}!</p>
            {props.user.admin && <span className="font-mono text-xs bg-amber-400 text-slate-900 p-1 rounded-sm">ADMIN</span>}
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