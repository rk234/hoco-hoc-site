import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"
import { Unsubscribe } from "firebase/auth"

export type LiveStats = {
    totalViews: number,
    totalUsers: number,
    totalHours: number
}

export function onStatsChange(callback: (stats: LiveStats) => void): Unsubscribe {
    let ref = doc(db, "aggregate/stats")
    return onSnapshot(ref, (doc) => {
        callback(doc.data() as LiveStats)
    })
}