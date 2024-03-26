import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"
import { Unsubscribe } from "firebase/auth"

export type School = {
    id: string
    name: string
    score?: number
}

type Scores = {
    [id: string]: number
}

const schools: School[] = [
    {
        id: "centennial",
        name: "Centennial High School",
    },
    {
        id: "river-hill",
        name: "River Hill High School"
    },
    {
        id: "marriots",
        name: "Marriotts Ridge High School"
    },
    {
        id: "atholton",
        name: "Atholton High School"
    },
    {
        id: "glenelg",
        name: "Glenelg High School"
    },
    {
        id: "guilford",
        name: "Guilford Park High School"
    },
    {
        id: "hammond",
        name: "Hammond High School"
    },
    {
        id: "howard",
        name: "Howard High School"
    },
    {
        id: "long-reach",
        name: "Long Reach High School"
    },
    {
        id: "hebron",
        name: "Mt. Hebron High School"
    },
    {
        id: "oakland",
        name: "Oakland Mills High School",
    },
    {
        id: "resevoir",
        name: "Resevoir High School"
    },
    {
        id: "wilde-lake",
        name: "Wilde Lake High School"
    }
]

export function getAllSchools(): School[] {
    return schools
}

export function getSchoolByID(id: string): School {
    return schools.find(school => school.id == id)
}

export function onScoresChange(callback: (scores: Scores) => void): Unsubscribe {
    let ref = doc(db, "aggregate/school-scores")
    return onSnapshot(ref, (scores) => {
        callback(scores.data() as Scores)
    })
}

//TODO add relevant stuff when point/quiz system is finalized