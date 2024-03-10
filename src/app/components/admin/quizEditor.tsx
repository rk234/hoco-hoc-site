"use client"

import { Question, Quiz } from "@/app/services/quizService"
import { useEffect, useState } from "react"
import QuestionEditor from "./questionEditor"

type Props = {
    quiz: Quiz
    answers?: number[]
    editing: boolean
    onSave: (quiz: Quiz, answers: number[]) => void
    onCancel: () => void
}

export default function QuizEditor(props: Props) {
    let [quiz, setQuiz] = useState<Quiz>(props.quiz)
    let [correctOpts, setCorrectOpts] = useState<number[]>([])

    useEffect(() => {
       setQuiz(props.quiz) 
    }, [props.quiz])

    useEffect(() => {
        if(props.answers) {
            setCorrectOpts(props.answers)
        } else {
            if(props.quiz)
                setCorrectOpts(props.quiz.questions.map(_ => -1))
        }
    }, [props.answers, props.quiz])

    function handleQuestionSave(index: number, question: Question, correctIndex: number) {
        let newQuiz = {...quiz} as Quiz
        
        if(index >= newQuiz.questions.length) {
            newQuiz.questions.push(question)
            correctOpts.push(correctIndex)
            setCorrectOpts(correctOpts)
        } else {
            newQuiz.questions[index] = question
            correctOpts[index] = correctIndex
        }
        setQuiz(newQuiz)
    }

    function handleQuestionDelete(index: number) {
        let newQuiz = {...quiz} as Quiz

        newQuiz.questions.splice(index, 1)
        setQuiz(newQuiz)
    }

    function handleQuestionAdd() {
        let newQuiz = {...quiz} as Quiz
        newQuiz.questions.push({
            question: "Sample Question Text",
            options: ["a", "b", "c"]
        })
        setQuiz(newQuiz)
    }

    function validate(): boolean {
        if(quiz.id != props.quiz.id) return false
        if(!quiz.points || quiz.points < 1) return false
        if(quiz.questions.length < 1) return false
        if(correctOpts.length != quiz.questions.length) return false

        for(let i = 0; i < quiz.questions.length; i++) {
            const q = quiz.questions[i]
            if(!q.question || q.question.length == 0) return false
            if(!q.options || q.options.length == 0) return false
            if(correctOpts[i] < 0 || correctOpts[i] >= q.options.length) return false
        }
        
        return true
    }

    function handleSave() {
        //TODO: Finish validation, pull in answers, figure out logic for saving answers and stuff
        if(validate()) {
            console.log("inputs valid!")
            console.log(quiz)
            console.log(correctOpts)

            props.onSave(quiz, correctOpts)
        } else {
            alert("Data seems to be invalid, double check your inputs!")
        }        
    }
    return props.quiz && <main className="flex flex-col gap-2 p-2">
        <h1 className="text-xl font-bold">{props.editing ? "Edit Quiz" : "Create Quiz" }</h1>
        <p>Point Value</p>
        <input type="number" value={quiz.points} onChange={e => setQuiz({...quiz, points: parseInt(e.target.value ?? "0")})} />
        <div className="flex flex-col gap-5">
        {
            props.quiz.questions.map((question, i) => {
                return <QuestionEditor key={i} number={i} answer={correctOpts[i]} question={question} onChange={handleQuestionSave} onDelete={handleQuestionDelete}/>
            })
        }
        </div>
        <button className="btn-secondary font-mono" onClick={handleQuestionAdd}>Add Question</button>
        <div className="flex flex-row gap-2">
            <button className="btn-primary flex-1 font-mono" onClick={handleSave}>Save</button>
            <button className="btn-secondary font-mono" onClick={props.onCancel}>Cancel</button>
        </div>
    </main>
}