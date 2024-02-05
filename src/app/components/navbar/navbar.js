import { JetBrains_Mono } from "next/font/google"
import styles from "./component.module.css"
import Link from "next/link"

const jbm = JetBrains_Mono({ subsets: ["latin"] })

export default function NavBar() {
    return (
        <main className="bg-slate-900 h-14 p-2 flex flex-row items-center border-b-2 border-b-sky-900 fixed z-30 w-full">
            <Link className={`${jbm.className} text-sky-300 text-xl md:text-2xl font-bold flex-1`} href={"/"}>&lt;HocoHOC/&gt;</Link>
            
            <div className="flex flex-row text-xs gap-3 md:text-md items-center items-stretch pr-1">
                <Link className={`${jbm.className} ${styles.nav_link}`} href={"/articles"}>Articles</Link>
                <Link className={`${jbm.className} ${styles.nav_link}`} href={"/leaderboard"}>Leaderboard</Link>
                <button className={`${jbm.className} btn-primary`}>Login</button>
            </div>
        </main>
    )
}