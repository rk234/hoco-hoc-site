import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import {auth, authProvider, db} from "../firebase/config"
import { User, signInWithPopup, signOut } from "firebase/auth"

type Profile = {
    uid: string
    email: string
    creationDate: Timestamp
    displayName: string
    school: string
    scores: any //look into a type for this later that works with firebase
    preferredLanguage: "python" | "cpp" | "java"
    admin: boolean
}

export async function signInOrRegister() {
    console.log("Signing in...")
    let user = await signInWithGoogle()
    console.log(user)
    
    if(await getUserData(user.uid)) {
        return true //Already registered
    } else {
        return false //Not yet registered
    }
}

export async function logout() {
    await signOut(auth)
}

export async function registerUserProfile(user: User, school: string, preferredLanguage: "python" | "cpp" | "java") {
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
}

export async function getUserData(uid: string) {
    //TODO
    try {
        let user = await getDoc(doc(db, "users/"+uid))
        if(user.data() != undefined)
            return {id: user.id, ...user.data()}
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