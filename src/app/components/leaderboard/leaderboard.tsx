import { School } from "@/app/services/schoolsService"

type Props = {
    schools: School[]
    className?: string
}

export default function Leaderboard(props: Props) {
    function topStyles(rank: number): string {
        if(rank == 0) {
            return "bg-gradient-to-b from-yellow-600/90 to-yellow-700/90 font-bold"
        } else if(rank == 1) {
            return "bg-gradient-to-b from-slate-400 to-slate-500 font-bold"
        } else if(rank == 2) {
            return "bg-gradient-to-b from-amber-800 to-amber-900 font-bold"
        } else {
            return "even:bg-gray-800"
        }
    }

    return <div className={`w-full h-full text-slate-300 bg-gray-900 rounded-md border-gray-800 border-2 overflow-hidden ${props.className}`}>
        <table className={`w-full h-full table-auto`}>
            <thead className="bg-gradient-to-b from-sky-800 to-sky-900 font-mono md:text-xl text-left uppercase">
                <tr>
                    <th className="p-2 text-center border-r border-r-gray-700">Place</th>
                    <th className="p-2 border-r border-r-gray-700">School</th>
                    <th className="p-2 text-center">Points</th>
                </tr>
            </thead>
            <tbody>
                {props.schools.map((school, index) => {
                    return <tr key={school.id} className={`border-b border-slate-700 ${topStyles(index)}`}>
                        <td className="p-5 font-bold text-xl md:text-2xl text-center font-mono border-r border-r-gray-700">{index+1}</td>
                        <td className="p-5 md:text-lg border-r border-r-gray-700">{school.name}</td>
                        <td className="p-5 font-bold text-xl md:text-2xl text-center">{school.score}</td>
                    </tr>;
                })}
            </tbody>
        </table>
    </div>
}