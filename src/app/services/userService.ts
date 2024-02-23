import { Timestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {auth, authProvider, db} from "../firebase/config"
import { User, signInWithPopup, signOut } from "firebase/auth"

export type Profile = {
    uid: string
    email: string
    creationDate: Timestamp
    displayName: string
    school: string
    scores: {
        [section: string]: number
    }
    preferredLanguage: "python" | "cpp" | "java"
    admin: boolean
}

export async function signInOrRegister(): Promise<User> {
    console.log("Signing in...")
    let user = await signInWithGoogle()
    return user
}

export async function logout() {
    await signOut(auth)
}

export async function createUserProfile(user: User, school: string, preferredLanguage: "python" | "cpp" | "java"): Promise<Profile> {
    const profile: Profile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        school: school,
        preferredLanguage: preferredLanguage,
        creationDate: Timestamp.fromDate(new Date()),
        scores: {},
        admin: false
    }

    await setDoc(doc(db, "users/"+profile.uid), profile)
    return profile
}

export async function getUserData(uid: string): Promise<Profile | undefined> {
    console.log("Fetch user data!")
    try {
        let user = await getDoc(doc(db, "users/"+uid))
        if(user.data() != undefined)
            return user.data() as Profile
        else
            return undefined
    } catch(err) {
        return undefined
    }
}

export async function signInWithGoogle(): Promise<User> {
    let authResult = await signInWithPopup(auth, authProvider)
    const user = authResult.user
    return user;
}