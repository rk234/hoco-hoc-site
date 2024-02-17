import { auth } from "@/app/firebase/config"
import { Profile, getUserData } from "@/app/services/userService"
import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, createContext, useEffect, useState } from "react"
import ModalContainer from "../modal/modalContainer"
import Modal from "../modal/modal"

type Props = {
    children?: ReactNode
}

const AuthContext = createContext<Profile>(null);

export default function AuthProvider(props: Props) {
    let [profile, setProfile] = useState<Profile>(null);
    let [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, user => {
            //TODO: get profile data for user if it exists, if not
            //prompt user to fill out basic info and create a profile
            if(user) {
                getUserData(user.uid).then(profile => {
                    if(profile) {
                        setProfile(profile)
                    } else {
                        setShowRegisterModal(true)
                    }
                }).catch(err => {

                })
            }
        })

        return listener;
    }, [profile, showRegisterModal])

    function registerProfile() {
        //TODO
    }

    return (
        <AuthContext.Provider value={profile}>
            {showRegisterModal && <ModalContainer>
                <Modal className="flex flex-col">
                    <h1 className={`font-mono text-2xl font-bold mb-2`}>Create your profile</h1>
                    <p className="mb-4">It looks like this is your first time logging in to Howard County Hour of Code, welcome! Please fill out the following information to create your profile and start competing.</p>

                    <div>

                    </div>

                    <button className="btn-primary" onClick={() => registerProfile()}>Create</button>
                </Modal>
            </ModalContainer>}
            {props.children || ""}
        </AuthContext.Provider>
    )
}