import { Question } from "@/app/services/quizService"
import { useState } from "react"
import Markdown from "react-markdown"
import MultiCodeView from "../multi-code-view/MultiCodeView"
import { useProfile } from "../auth-provider/authProvider"
import { mdCodeBlockParser } from "@/app/services/utils"

type Props = {
    className?: string
    question: Question
    number: number
    wrong: boolean
    onChange: (selection: number) => void
}

export default function QuizQuestion(props: Props) {
    let [selected, setSelected] = useState<number>(-1)
    let profile = useProfile()

    function handleSelectionChange(selectionIndex: number) {
        console.log("Selected ", selectionIndex)
        setSelected(selectionIndex)
        props.onChange(selectionIndex)
    }

    return <main className={`flex flex-col ${props.className} gap-2`}>
        <div className={`flex flex-row items-start gap-2 ${props.wrong && "border rounded border-red-400 bg-red-400/30"}`}>
            <div>
                <h1 className="ml-1 font-bold font-mono text-lg">{props.number}.</h1>
            </div>
            <div className="w-5/6">
                <Markdown className="text-lg w-full"
                    components={{
                        code(code_props) {
                            return mdCodeBlockParser(code_props, profile)
                        }
                    }}
                >{props.question.question}</Markdown>
            </div>
        </div>
        <form>
            <fieldset className="flex flex-col gap-1">
                {props.question.options.map((opt, i) => <div key={i} onClick={() => handleSelectionChange(i)} className={`flex flex-row gap-2 items-center rounded border p-2 py-4 cursor-pointer hover:bg-sky-700/30 ${i == selected ? "bg-sky-700/30 border-sky-300" : "bg-slate-9000/30 border-slate-700"}`}>
                    <div className={`min-w-4 min-h-4 rounded-full overflow-hidden ${i == selected ? "bg-sky-300" : "bg-slate-600"}`}></div>
                    <label htmlFor={props.number + "-opt-" + i}>
                        <Markdown className=""
                            components={{
                                code(code_props) {
                                    return mdCodeBlockParser(code_props, profile)
                                }
                            }}
                        >{opt}</Markdown>
                    </label>
                </div>
                )}
            </fieldset>
        </form>
    </main>
}
