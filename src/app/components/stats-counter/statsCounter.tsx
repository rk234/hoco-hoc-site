import { LiveStats } from "@/app/services/statsService"

type Props = {
    className?: string,
    liveStats: LiveStats
}

export default function StatsCounter(props: Props) {
    return <main className={`flex flex-col items-center ${props.className} bg-gray-900`}>
        <div className="rounde p-4 flex flex-row gap-2 justify-center items-center max-w-2xl w-full">
            <div className="p-2 bg-gray-800 rounded flex flex-col items-center justify-center h-40 w-full max-w-96 gap-2">
                <h1 className="text-sky-300 font-mono text-4xl sm:text-6xl font-bold">{props.liveStats.totalUsers}</h1>
                <p className="font-mono text-center text-sm">Users</p>
            </div>
            <div className="p-2 bg-gray-800 rounded flex flex-col items-center justify-center h-40 w-full max-w-96 gap-2">
                <h1 className="text-sky-300 font-mono text-4xl sm:text-6xl font-bold">{props.liveStats.totalViews}</h1>
                <p className="font-mono text-center text-sm">Article Views</p>
            </div>
            <div className="p-2 bg-gray-800 rounded flex flex-col items-center justify-center h-40 w-full max-w-96 gap-2">
                <h1 className="text-sky-300 font-mono text-4xl sm:text-6xl font-bold">{props.liveStats.totalHours}</h1>
                <p className="font-mono text-center text-sm">Hours Served</p>
            </div>
        </div>
    </main>
}