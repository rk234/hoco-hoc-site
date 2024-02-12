import { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
}

export default function ModalContainer(props: Props) {
    return <main className={`w-full h-full fixed top-0 left-0 flex flex-col justify-center items-center backdrop-blur-md z-50 p-2 overflow-hidden ${props.className || ""}`}>
        {props.children}
    </main>
}