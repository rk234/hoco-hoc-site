type Quiz = {
    id: string
    questions: Question[]
    points: number
}

type Question = {
    question: string
    options: string[]
}