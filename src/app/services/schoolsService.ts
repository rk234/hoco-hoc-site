export type School = {
    id: string
    name: string
    //score: number <-- for later
}

const schools: School[] = [
    {
        id: "centennial",
        name: "Centennial High School"
    },
    {
        id: "river-hill",
        name: "River Hill High School"
    },
    {
        id: "marriots",
        name: "Marriots Ridge High School"
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

//TODO add relevant stuff when point/quiz system is finalized