//TODO

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
    }
]

export function getAllSchools(): School[] {
    return schools
}

export function getSchoolByID(id: string): School {
    return schools.find(school => school.id == id)
}