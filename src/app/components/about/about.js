import Link from "next/link"

export default function AboutSection() {
    return (
        <div >
            <div >
                <h1></h1>
                <h3 className={`text-center mt-8 ml-10 mr-10 text-sky-300 text-4xl md:text-6xl  mb-2 mt-2`}>About Us</h3>
                <p className={`ml-10 mr-10 font-mono flex flex-row mt-8 gap-2`} >
                    The Hour of Code started as a one-hour introduction to computer science, designed to demystify "code", to show that anybody can learn the basics, and to broaden participation in the field of computer science. It has since become a worldwide effort to celebrate computer science, starting with 1-hour coding activities but expanding to all sorts of community efforts. Howard County's version of Hour of Code is made by students, for students.
                    <br></br><br></br><br></br><br></br>
                </p>
                <div class="flex flex-row space-x-4 ml-10 mr-10">
                    <div class="flex-1 font-mono">
                        <h4 className={`mt-8 ml-10 mr-10 text-indigo-400 text-3xl md:text-5xl  mb-2 mt-2`}>Leaderboard</h4>
                        <p class="ml-10 mr-10 mt-8 gap-2">We aim to provide aspiring computer scientists with an opportunity for skill development and friendly competition. Visit the leaderboard to check out how your high school is doing! All Howard County schools and corresponding points will be displayed here.</p>
                        <br></br>
                        <Link class="ml-10 btn-secondary" href={"/leaderboard"}> View Leaderboard </Link>
                    </div>
                    <div>
                        <img class="mr-10 flex-1 mt-8 gap-2" src="/graphics/leaderboardGraphic.png"></img>
                    </div>
                </div>

            </div>
        </div>
    )
}