import { Quiz } from "@/app/services/quizService"
import QuizQuestion from "./QuizQuestion"
import { useState } from "react"

type Props = {
    className?: string
    quiz: Quiz
    onSumbit: (answers: number[]) => void
}

export default function QuizPrompt(props: Props) {
    let [answers, setAnswers] = useState<number[]>(props.quiz.questions.map(_ => -1));

    function handleQuestionAnswered(questionIndex: number, answerIndex: number) {
        let newAnswers = answers.copyWithin(0, answers.length)
        newAnswers[questionIndex] = answerIndex
        setAnswers(newAnswers)
    }

    return <main className="flex flex-col bg-slate-800 rounded-md overflow-hidden border border-gray-600 gap-2">
        <div className="p-2 text-slate-200 border-b border-gray-600 flex flex-row items-center">
            <h1 className="text-2xl font-bold flex-1 font-mono">Quiz</h1>
            <p className="font-mono text-slate-400 text-sm">{props.quiz.points} pts</p>
        </div>
        <div className="p-2 flex flex-col gap-9">
            {props.quiz.questions.map((question, index) => <QuizQuestion onChange={(ans) => handleQuestionAnswered(index, ans)} key={index} question={question} number={index + 1} />)}
        </div>
        <div className="p-2 pt-0">
            <button className="btn-primary font-mono w-full" onClick={() => props.onSumbit(answers)}>Sumbit</button>
        </div>
    </main>
}
