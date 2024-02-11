import { doc, getDoc } from "firebase/firestore";
import {auth, authProvider, db} from "../firebase/config"
import { User, signInWithPopup, signOut } from "firebase/auth"

export async function signInOrRegister() {
    console.log("Signing in...")
    let user = await signInWithGoogle()
    console.log(user)
    
    if(await getUserData(user.uid)) {
        console.log("User already registered!")
    } else {
        console.log("User not already registered!")
    }
}

export async function logout() {
    await signOut(auth)
}

export async function registerUser() {
    //TODO
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