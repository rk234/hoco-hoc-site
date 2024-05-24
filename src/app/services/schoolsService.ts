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
        name: "Reservoir High School"
    },
    {
        id: "wilde-lake",
        name: "Wilde Lake High School"
    },
    //Middle Schools
    {
        id: "bbms",
        name: "Bonnie Branch Middle School"
    },
    {
        id: "bmms",
        name: "Burleigh Manor Middle School"
    },
    {
        id: "cms",
        name: "Clarksville Middle School"
    },
    {
        id: "dms",
        name: "Dunloggin Middle School"
    },
    {
        id: "elms",
        name: "Elkridge Landing Middle School"
    },
    {
        id: "emms",
        name: "Ellicott Mills Middle School"
    },
    {
        id: "fqms",
        name: "Folly Quarter Middle School"
    },
    {
        id: "hms",
        name: "Hammond Middle School"
    },
    {
        id: "hcms",
        name: "Harper's Choice Middle School"
    },
    {
        id: "lems",
        name: "Lake Elkhorn Middle School"
    },
    {
        id: "lkms",
        name: "Lime Kiln Middle School"
    },
    {
        id: "mwms",
        name: "Mayfield Woods Middle School"
    },
    {
        id: "mvms",
        name: "Mount View Middle School"
    },
    {
        id: "mhms",
        name: "Murray Hill Middle School"
    },
    {
        id: "omms",
        name: "Oakland Mills Middle School"
    },
    {
        id: "pms",
        name: "Patapsco Middle School"
    },
    {
        id: "pvms",
        name: "Patuxent Valley Middle School"
    },
    {
        id: "tvms",
        name: "Thomas Viaduct Middle School"
    },
    {
        id: "wlms",
        name: "Wilde Lake Middle School"
    }
]

export function getAllSchools(): School[] {
    return schools.sort((a, b) => a.name.localeCompare(b.name));
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
