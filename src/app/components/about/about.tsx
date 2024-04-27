import Link from "next/link";
import Leaderboard from "../leaderboard/leaderboard";
import { School } from "@/app/services/schoolsService";
import ArticleRenderer from "@/app/components/article-renderer/articleRenderer";
import Read from "@/app/articles/read/page"


export default function AboutSection() {
    const dummySchools: School[] = [
        { id: "School 1", name: "School 1", score: 5000 },
        { id: "School 2", name: "School 2", score: 4000 },
        { id: "School 3", name: "School 3", score: 3000 },
        { id: "School 4", name: "School 4", score: 2000 },
        { id: "School 5", name: "School 5", score: 1000 }
    ];

    const article = {
        title: "Hello World",
        description: "This is a dummy article for demonstration purposes.",
        tags: ["Dummy", "Demo", "Article"],
        content: "The “Hello World!” program is the first step in learning how to code with any language. This tradition was first established in the 70s by Nokia Bell Labs and has since advanced into the famous first line of code that most programmers write. It is a program that prints the text “Hello World!” to some output stream, usually the console, and it’s primarily taught for three purposes..."
    };

    const progressData = [
        { percentage: 25, color: "text-sky-400" },
        { percentage: 50, color: "text-sky-400" },
        { percentage: 75, color: "text-sky-400" },
        { percentage: 100, color: "text-sky-400" }
    ];

    return (
        <div className="px-8 md:px-0 lg:px-12 mb-20 text-center md:text-left">
            <h3 className="font-mono mt-16 ml-2 mr-2 lg:ml-25 lg:mr-25 text-sky-300 font-bold bg-gradient-to-b from-sky-300 to-sky-500 text-transparen font-bold text-transparent bg-clip-text text-5xl md:text-6xl mb-8 text-center leading-tight">About Us</h3>
            <p className="md:px-12 mb-10 md:mb-10 sm:text-lg md:text-xl font-sans flex flex-row mt-8 gap-2">
                The Hour of Code started as a one-hour introduction to computer science, designed to demystify "code", to show that anybody can learn the basics, and to broaden participation in the field of computer science. It has since become a worldwide effort to celebrate computer science, starting with 1-hour coding activities but expanding to all sorts of community efforts. Howard County's version of Hour of Code is made by students, for students.
            </p>

            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:ml-10 md:mr-10 mb-20">
                <div className="md:w-64 flex-grow mb-8 md:mb-0">
                    <h3 className="sm:mt-20 md:mt-10 lg:mt-20 font-mono text-4xl md:text-5xl bg-gradient-to-r from-sky-300 to-sky-500 text-transparent bg-clip-text font-bold">Compete For Glory!</h3>
                    <p className="font-sans mt-10 mb-10 md:mr-10 text-l md:text-xl">We aim to provide aspiring computer scientists with an opportunity for skill development and friendly competition. Visit the leaderboard to check out how your high school is doing! All Howard County schools and corresponding points will be displayed here.</p>
                    <Link href={"/leaderboard"} className="btn-secondary text-lg">View Leaderboard</Link>
                </div>
                <div className="flex-grow w-full h-full md:w-60 lg:w-0 text-slate-300 bg-gray-900 rounded-md border-gray-800 border-2 overflow-hidden">
                    <Leaderboard schools={dummySchools} />
                </div>
            </div>


            <div className="flex flex-col-reverse gap-12 md:gap-0 md:flex-row md:ml-8 md:mr-8 lg:ml-10 lg:mr-10 mt-10 ">
                <div className="flex-grow w-full h-full text-slate-300 bg-gray-800 rounded-lg border-b-2 border-gray-900 overflow-hidden md:mr-10 lg:mr-20 relative">
                    <div className="absolute z-20 w-full h-full bg-gradient-to-b from-transparent via-70% via-transparent to-black rounded-lg"></div>
                    <div className="text-left w-full h-full p-4 ">
                        <div className="flex flex-row mt-5 items-center gap-2">
                            <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
                        </div>
                        <p className="font-mono mt-2 text-slate-300 text-sm">{article.description}</p>
                        <div className="font-mono flex gap-2 mt-2">
                            {article.tags.map((tag, index) => (
                                <div key={index} className="bg-sky-300 text-slate-950 p-1 rounded-sm text-xs font-bold">
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <hr className="mt-3 border-b border-slate-600" />
                        <ArticleRenderer markdown={article.content} />
                    </div>
                </div>


                <div className="flex-grow w-full font-mono">
                    <h3 className="mt-5 font-mono leading-tight text-4xl md:text-5xl bg-gradient-to-r from-sky-300 to-sky-500 text-transparent bg-clip-text font-bold"> Learn New Topics! </h3>
                    <p className="font-sans mt-10 mb-10 lg:mr-10 text-l md:text-xl">HocoHOC offers a wide variety of interesting and informative articles on computer science topics. By completing them, you'll not only acquire new skills but also earn your school points!</p>
                    <Link href={"/articles"} className="btn-secondary font-sans text-lg">View Articles</Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:ml-8 md:mr-8 lg:ml-10 lg:mr-10 sm:mt-10 md:mt-0 lg:mt-10">
                <div className="flex-grow max-w-2xl font-mono">
                    <h3 className="mt-20 font-mono leading-tight text-4xl md:text-5xl bg-gradient-to-r from-sky-300 to-sky-500 text-transparent bg-clip-text font-bold">Track Your Progress!</h3>
                    <p className="font-sans mt-10 mb-10 md:mr-5 lg:mr-10 text-l md:text-xl">Complete quizzes to earn points! You'll be able to see how you progress through four sections: Fundamentals, Data Structures & Algorithms, Web Development, and Machine Learning.</p>
                </div>
                <div className="flex-grow-2 justify-center md:mt-8">
                    <div className="mt-4 md:mt-28 lg:mt-4 relative h-68 lg:h-60 bg-gray-800 rounded-lg p-4 flex flex-wrap md:flex-nowrap justify-center items-center">
                        {progressData.map((item, index) => (
                            <div key={index} className="text-center py-2 md:py-0 px-4 md:px-1">
                                {/* Progress bar */}
                                <svg className="w-24 h-24 md:w-24 md:h-24 lg:w-36 lg:h-36 relative z-10">
                                    <circle
                                        className="stroke-current text-white-200"
                                        strokeWidth="8"
                                        fill="transparent"
                                        r="40"
                                        cx="50%"
                                        cy="50%"
                                    />
                                    <circle
                                        className={`stroke-current ${item.color}`}
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray="251.327"
                                        strokeDashoffset={(100 - item.percentage) / 100 * 251.327}
                                        r="40"
                                        cx="50%"
                                        cy="50%"
                                    />
                                    <text
                                        x="50%"
                                        y="52.5%"
                                        className={`text-lg font-bold fill-current ${item.color}`}
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                    >
                                        {`${item.percentage}%`}
                                    </text>
                                </svg>
                                <div className="text-md md:text-lg ">{"Section " + (index + 1)}</div> {/* Added text under each progress bar */}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
