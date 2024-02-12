import { ReactNode } from "react"

type Props = {
    children: ReactNode
    className: string
}

export default function Modal(props: Props) {
    return <main className={`flex flex-col p-4 max-w-2xl w-full bg-slate-800 border-2 border-slate-600 rounded-md ${props.className}`}>
        {props.children}
    </main>
}