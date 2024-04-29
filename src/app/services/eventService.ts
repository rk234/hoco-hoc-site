import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"
import { Unsubscribe } from "firebase/auth"

export type EventStatus = {
  live: boolean
  statusMessage: string
}

export function onEventStatusChange(callback: (eventStatus: EventStatus) => void): Unsubscribe {
  const ref = doc(db, "config/event")
  return onSnapshot(ref, (status) => {
    callback(status.data() as EventStatus)
  })
}
