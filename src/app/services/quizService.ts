import { doc } from "firebase/firestore"

export type Quiz = {
    id: string
    questions: Question[]
    points: number
}

export type Question = {
    question: string // questions will support markdown format to allow for code blocks, images, etc.
    options: string[]
}

export async function getQuiz(id: string) {
    //let ref = doc(db, "quizzes/"+id)
}

//answers is an array of indexes representing the correct answers for each of the question object's options
//returns a boolean representing whether correct/incorrect based on response from cloud fn
export async function checkAnswers(quiz_id: string, answers: number[]) : Promise<boolean> {
    //todo
}

//admin
export async function createQuiz(quiz: Quiz, answers: number[]) {
    //todo
}