import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export type Quiz = {
    id: string
    questions: Question[]
    points: number
}

export type Question = {
    question: string // questions will support markdown format to allow for code blocks, images, etc.
    options: string[]
}

export async function getQuiz(id: string): Promise<Quiz> {
    let ref = doc(db, "quizzes/" + id)
    let quiz = (await getDoc(ref)).data() as Quiz
    return quiz
}

export async function getQuizAnswers(quiz_id: string) {
    let ref = doc(db, "quiz-ans/" + quiz_id)
    let answers = (await getDoc(ref)).data().answers as number[]
    return answers
}

//answers is an array of indexes representing the correct answers for each of the question object's options
//returns a boolean representing whether correct/incorrect based on response from cloud fn
export async function checkAnswers(quiz_id: string, answers: number[]): Promise<boolean> {
    //todo call cloud fn
}

//admin
export async function createQuiz(quiz: Quiz, answers: number[]) {
    let quizRef = doc(db, "quizzes/" + quiz.id);
    let ansRef = doc(db, "quiz-ans/" + quiz.id);
    await setDoc(quizRef, quiz, { merge: true })
    await setDoc(ansRef, {
        points: quiz.points,
        answers: answers
    }, { merge: true })
}
