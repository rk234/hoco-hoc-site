import { Question } from "@/app/services/quizService"
import { useEffect, useState } from "react"

type Props = {
    className?: string
    question: Question
    onChange: (index: number, question: Question, correct: number) => void
    onDelete: (index: number) => void
    number: number
    answer?: number
}

export default function QuestionEditor(props: Props) {
    let [question, setQuestion] = useState<Question>(props.question)
    let [correctIndex, setCorrectIndex] = useState<number>(props.answer ?? -1)
    let [newOpt, setNewOpt] = useState<string>("")

    useEffect(() => {
       setQuestion(props.question) 
    }, [props.question])

    useEffect(() => {
        setCorrectIndex(props.answer ?? -1)
    }, [props.answer])

    function removeOption(index: number) {
        setCorrectIndex(-1)
        let newQuestion = {...question}

        newQuestion.options.splice(index, 1)
        setQuestion(newQuestion)
        props.onChange(props.number, question, correctIndex)
    }

    function handleMarkCorrect(index: number) {
        setCorrectIndex(index)
        props.onChange(props.number, question, index)
    }

    function handleAddOption() {
        let newQuestion = {...question}

        newQuestion.options.push(newOpt)
        setQuestion(newQuestion)
        props.onChange(props.number, newQuestion, correctIndex)
    }

    function handleQuestionTextChange(text: string) {
        setQuestion({...question, question: text})
        props.onChange(props.number, {...question, question: text}, correctIndex)
    }

    return <main className={`flex flex-col gap-1 border rounded bg-slate-800/50 border-slate-700 p-2 ${props.className}`}>
        <div className="flex flex-row gap-2 items-center">
            <p className="flex-1">Question {props.number + 1}</p>
            <button className="btn-danger font-mono" onClick={() => props.onDelete(props.number)}>Delete</button>
        </div>
        <textarea value={question.question} onChange={e => handleQuestionTextChange(e.target.value)} />
        <p>Options (Hover over option text and click to delete)</p>
        {
            question.options.map((opt, i) => {
              return <div key={i} className="flex flex-row items-center border rounded p-2 border-slate-700">
                <p className="hover:line-through cursor-pointer hover:text-red-400 hover:font-bold" onClick={() => removeOption(i)}>{i+1}: {opt}</p>  
                <div className="flex-1"></div>
                <button className={`btn-secondary font-mono ${correctIndex == i && "bg-green-400"}`} onClick={() => handleMarkCorrect(i)}>[Mark Correct]</button>
              </div>
            })
        }
        <div className="flex flex-row gap-2 items-center">
            <input className="flex-1" type="text" value={newOpt} placeholder="Add another option..." onChange={e => setNewOpt(e.target.value)} />
            <button className="btn-primary font-mono" onClick={handleAddOption} disabled={newOpt.length == 0}>Add Option</button>
        </div>
    </main>
}