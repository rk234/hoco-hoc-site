import { JetBrains_Mono } from "next/font/google"
import styles from "./component.module.css"
import Link from "next/link"

const jbm = JetBrains_Mono({ subsets: ["latin"] })

export default function NavBar() {
    return (
        <main className="bg-slate-950 p-2 flex flex-row items-center">
            <span className={`${jbm.className} text-sky-300 text-xl md:text-2xl font-bold flex-1`}>&lt;HocoHOC/&gt;</span>
            
            <div className="flex flex-row text-sm gap-1 md:gap-10 md:text-md items-center pr-1">
                <Link className={`${styles.nav_link}`} href={"/articles"}>Articles</Link>
                <Link className={`${styles.nav_link}`} href={"/articles"}>Leaderboard</Link>

                <button className={`${jbm.className} btn-primary`}>Login</button>
            </div>
        </main>
    )
}