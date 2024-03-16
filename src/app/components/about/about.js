import Link from "next/link"

export default function AboutSection() {
    return (
        <div >
            <div >
                <h1></h1>
                <h3 className={`text-center mt-8 ml-10 mr-10 text-sky-300 text-4xl md:text-6xl  mb-2 mt-2`}>About Us</h3>
                <p className={`ml-10 mr-10 font-sans flex flex-row mt-8 gap-2`} >
                    The Hour of Code started as a one-hour introduction to computer science, designed to demystify "code", to show that anybody can learn the basics, and to broaden participation in the field of computer science. It has since become a worldwide effort to celebrate computer science, starting with 1-hour coding activities but expanding to all sorts of community efforts. Howard County's version of Hour of Code is made by students, for students.
                    <br></br><br></br><br></br><br></br>
                </p>
                <div class="flex flex-row space-x-4 ml-10 mr-10">
                    <div class="flex-grow-2 font-mono">
                        <h4 className={`mt-8 mr-20 text-indigo-400 text-3xl md:text-5xl  mb-2 mt-2`}>Leaderboard</h4>
                        <p class="font-sans mt-8 gap">We aim to provide aspiring computer scientists with an opportunity for skill development and friendly competition. Visit the leaderboard to check out how your high school is doing! All Howard County schools and corresponding points will be displayed here.</p>
                        <br></br>
                        <Link class=" btn-secondary" href={"/leaderboard"}> View Leaderboard </Link>
                    </div>
                    
                        <div className={`flex-grow w-full h-full text-slate-300 bg-gray-900 rounded-md border-gray-800 border-2 overflow-hidden mr-10`}>
                            <table className={`w-full h-full table-auto`}>
                                <thead className="bg-gradient-to-b from-sky-800 to-sky-900 font-mono md:text-xl text-left uppercase">
                                    <tr>
                                        <th className="p-2 text-center border-r border-r-gray-700">Place</th>
                                        <th className="p-2 border-r border-r-gray-700">School</th>
                                        <th className="p-2 text-center">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr className={`border-b border-slate-700 bg-gradient-to-b from-yellow-600/90 to-yellow-700/90 font-bold`}>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center font-mono border-r border-r-gray-700">1</td>
                                        <td className="p-5 md:text-lg border-r border-r-gray-700">High School 1</td>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center">5000</td>
                                    </tr>

                                    <tr className={`border-b border-slate-700 bg-gradient-to-b from-slate-400 to-slate-500 font-bold`}>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center font-mono border-r border-r-gray-700">2</td>
                                        <td className="p-5 md:text-lg border-r border-r-gray-700">High School 2</td>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center">4000</td>
                                    </tr>

                                    <tr className={`border-b border-slate-700 bg-gradient-to-b from-amber-800 to-amber-900 font-bold`}>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center font-mono border-r border-r-gray-700">3</td>
                                        <td className="p-5 md:text-lg border-r border-r-gray-700">High School 3</td>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center">3000</td>
                                    </tr>

                                    <tr className={`border-b border-slate-700 even:bg-gray-800`}>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center font-mono border-r border-r-gray-700">4</td>
                                        <td className="p-5 md:text-lg border-r border-r-gray-700">High School 4</td>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center">2000</td>
                                    </tr>

                                    <tr className={`border-b border-slate-700`}>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center font-mono border-r border-r-gray-700">5</td>
                                        <td className="p-5 md:text-lg border-r border-r-gray-700">High School 5</td>
                                        <td className="p-5 font-bold text-xl md:text-xl text-center">1000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* <img class="mr-10 flex-1 mt-8 gap-2" src="/graphics/leaderboardGraphic.png"></img> */}
                </div>

            </div>
        </div>
    )
}