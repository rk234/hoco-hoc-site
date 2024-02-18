import { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
}

export default function Modal(props: Props) {
    return <main className={`p-4 max-w-2xl w-full bg-slate-800 border-2 border-slate-600 rounded-md overflow-y-scroll ${props.className || ""} `}>
        {props.children}
    </main>
}