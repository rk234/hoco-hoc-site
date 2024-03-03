"use client"

import { useEffect, useState } from "react";
import Leaderboard from "../components/leaderboard/leaderboard";
import { School, getSchoolByID, onScoresChange } from "../services/schoolsService";

export default function LeaderboardPage() {
    let [schools, setSchools] = useState<School[]>([])

    useEffect(() => {
        let unsub = onScoresChange((scores) => {
            console.log(scores)
            let arr: School[] = []
            for(let id in scores) {
                let school = getSchoolByID(id)
                school.score = scores[id]
                arr.push(school)
            }
            setSchools(arr)
        })

        return unsub
    }, [])

    function sort(schools: School[]): School[] {
        return schools.sort((a,b) => {
            
            return a.score == b.score ? (a.name > b.name ? 1 : -1) : (b.score - a.score)
        })
    }

    return <main className="p-4 flex flex-col items-center">
        <div className="max-w-2xl w-full">
            <div className="bg-sky-800 p-4 font-mono text-2xl font-bold rounded mb-2 border-2 border-sky-900">
                <h1>School Leaderboard</h1>
            </div>
            <Leaderboard schools={sort(schools)} className="w-full" />
        </div>
    </main>
}