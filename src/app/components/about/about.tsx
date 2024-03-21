import Link from "next/link";
import Leaderboard from "../leaderboard/leaderboard";
import { School } from "@/app/services/schoolsService"; 



export default function AboutSection() {
    const dummySchools: School[] = [
        { id: "School 1", name: "School 1", score: 5000 },
        { id: "School 2", name: "School 2", score: 4000 },
        { id: "School 3", name: "School 3", score: 3000 },
        { id: "School 4", name: "School 4", score: 2000 },
        { id: "School 5", name: "School 5", score: 1000 }

    ];

    return (
        <div>
            <h3 className="text-center mt-8 ml-10 mr-10 text-sky-300 text-4xl md:text-6xl mb-2 mt-2">About Us</h3>
            <p className="ml-10 mr-10 mb-10 font-sans flex flex-row mt-8 gap-2">
                The Hour of Code started as a one-hour introduction to computer science, designed to demystify "code", to show that anybody can learn the basics, and to broaden participation in the field of computer science. It has since become a worldwide effort to celebrate computer science, starting with 1-hour coding activities but expanding to all sorts of community efforts. Howard County's version of Hour of Code is made by students, for students.
            </p>
            <div className="flex flex-row space-x-4 ml-10 mr-10">
                <div className="flex-grow-2 font-mono">
                    <h4 className="mt-8 mr-20 text-indigo-400 text-3xl md:text-5xl mb-2 mt-2">Leaderboard</h4>
                    <p className="font-sans mt-10 mb-10 gap">We aim to provide aspiring computer scientists with an opportunity for skill development and friendly competition. Visit the leaderboard to check out how your high school is doing! All Howard County schools and corresponding points will be displayed here.</p>
                    <Link href={"/leaderboard"} className="btn-secondary">View Leaderboard</Link>
                </div>
                <div className="flex-grow w-full h-full text-slate-300 bg-gray-900 rounded-md border-gray-800 border-2 overflow-hidden mr-10">
                    <Leaderboard schools={dummySchools} />
                </div>
            </div>
        </div>
    );
}
