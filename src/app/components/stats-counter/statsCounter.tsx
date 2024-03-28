import { LiveStats } from "@/app/services/statsService"

type Props = {
    className?: string,
    liveStats: LiveStats
}

export default function StatsCounter(props: Props) {
    return <main className={`flex flex-col items-center ${props.className} bg-gradient-to-br from-black via-80% via-indigo-950 to-indigo-950 p-4 md:p-8 md:py-32 py-20`}>
        <div className="flex flex-col max-w-screen-xl items-start w-full">
            <div className="w-full gap-12 flex flex-col max-w-3xl">
                <div className="flex-1">
                    <h1 className="font-mono leading-tight text-5xl md:text-6xl pb-4 bg-gradient-to-r from-indigo-300 to-indigo-400 text-transparent bg-clip-text font-bold"> Join a Growing Community </h1>
                    <p className="text-xl"> Compete with students from across the county to learn, win prizes, and bring your school to the top of the leaderboard! </p>
                </div>
                <div className="rounded flex flex-col md:flex-row gap-2 justify-center items-center">
                    <div className="p-4 bg-gray-800/50 rounded flex flex-col items-center w-full gap-2">
                        <h1 className="bg-gradient-to-b from-indigo-300 to-indigo-400 text-transparent bg-clip-text font-mono text-5xl sm:text-6xl font-bold">{props.liveStats.totalUsers}</h1>
                        <p className="font-mono text-left text-lg">Users</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded flex flex-col items-center w-full gap-2">
                        <h1 className="bg-gradient-to-b from-indigo-300 to-indigo-400 text-transparent bg-clip-text font-mono text-5xl sm:text-6xl font-bold">{props.liveStats.totalViews}</h1>
                        <p className="font-mono text-left text-lg">Article Views</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded flex flex-col items-center w-full gap-2">
                        <h1 className="bg-gradient-to-b from-indigo-300 to-indigo-400 text-transparent bg-clip-text font-mono text-5xl sm:text-6xl font-bold">{Math.round(props.liveStats.totalHours)}</h1>
                        <p className="font-mono text-left text-lg">Hours Served</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
}
