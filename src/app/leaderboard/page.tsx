import Leaderboard from "../components/leaderboard/leaderboard";
import { getAllSchools } from "../services/schoolsService";

export default function LeaderboardPage() {
    return <main className="p-4 flex flex-col items-center">
        <div className="max-w-2xl w-full">
            <div className="bg-sky-800 p-4 font-mono text-2xl font-bold rounded mb-2 border-2 border-sky-900">
                <h1>School Leaderboard</h1>
            </div>
            <Leaderboard schools={getAllSchools()} className="w-full" />
        </div>
    </main>
}