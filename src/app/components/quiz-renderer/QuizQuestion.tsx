import { Question } from "@/app/services/quizService"
import Markdown from "react-markdown"

type Props = {
    className?: string
    question: Question
    number: number
}

export default function QuizQuestion(props: Props) {
    return <main className={`flex flex-col ${props.className} gap-2`}>
        <div className="flex flex-row items-start gap-2">
            <h1 className="ml-1 font-mono text-slate-400 text-lg">{props.number}.</h1>
            <div>
                <Markdown className="text-lg">{props.question.question}</Markdown>
            </div>
        </div>
        <form>
            <fieldset className="flex flex-col gap-1">
                {props.question.options.map((opt, i) => <div key={i} className="flex flex-row gap-2 items-center rounded border bg-slate-900/30 border-slate-700 p-2 py-4 cursor-pointer hover:bg-slate-700">
                    <div className="w-5 h-5 rounded-full bg-slate-700 overflow-hidden hover:bg-sky-600 ring-offset-1 ring-offset-slate-700 hover:ring hover:ring-sky-600"></div>
                    <label htmlFor={props.number+"-opt-"+i}>{opt}</label>
                </div>
                )}
            </fieldset>
        </form>
    </main>
}