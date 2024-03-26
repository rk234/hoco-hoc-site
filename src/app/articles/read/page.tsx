"use client"

import { getArticleFromID, Article, incrementViewCount } from "@/app/services/articleService"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Modal from "@/app/components/modal/modal"
import Link from "next/link"
import ModalContainer from "@/app/components/modal/modalContainer"
import { useProfile, useProfileUpdate } from "@/app/components/auth-provider/authProvider";
import Image from "next/image";

import { EyeSlashIcon, CheckCircleIcon } from "@heroicons/react/24/solid"
import ArticleRenderer from "@/app/components/article-renderer/articleRenderer";
import { Profile, signInOrRegister, updateStartedArticles } from "@/app/services/userService"
import { checkAnswers, getQuiz, Quiz } from "@/app/services/quizService"
import QuizPrompt from "@/app/components/quiz/Quiz"
import Confetti from "react-confetti"

export default function Read() {
    const params = useSearchParams()
    let [windowSize, setWindowSize] = useState({ width: 100, height: 100 })
    let [article, setArticle] = useState<Article>()
    let [loadingArticle, setLoadingArticle] = useState(true)

    let [quizError, setQuizError] = useState<"not-authenticated" |
        "contest-not-live" | "already-completed"
        | "error" | undefined>(undefined)
    let [articleLoadError, setArticleLoadError] = useState(false)

    let [showSponsor, setShowSponsor] = useState(true)
    let [visited, setVisited] = useState(false)
    let [progress, setProgress] = useState<"started" | "complete">("started")
    let [quiz, setQuiz] = useState<Quiz>(undefined)
    let [loadingQuiz, setLoadingQuiz] = useState<boolean>(true)
    let [quizCheckWorking, setQuizCheckWorking] = useState<boolean>(false)
    let [wrongAns, setWrongAns] = useState<number[]>([])
    let [confetti, setConfetti] = useState<boolean>(false)

    let profile = useProfile()
    let setProfile = useProfileUpdate()

    useEffect(() => {
        if (!article) {
            setLoadingArticle(true)
            let id = params.get("article")
            if (id) {
                getArticleFromID(id).then(article => {
                    setArticle(article)
                    setLoadingArticle(false)
                }).catch(err => {
                    setArticleLoadError(true)
                    setLoadingArticle(false)
                    console.log(err)
                })
            } else {
                setArticleLoadError(true)
                setLoadingArticle(false)
            }
        }
    }, [article, loadingArticle, params])

    useEffect(() => {
        if (article && article.quiz) {
            console.log("Article has quiz!")
            getQuiz(article.id + "-quiz").then(quiz => {
                console.log(quiz)
                setQuiz(quiz)
                setLoadingQuiz(false)
            }).catch(err => {
                console.log("Error while fetching the quiz for this article")
                console.log(err)
                setLoadingQuiz(false)
                setArticleLoadError(true)
            })
        } else {
            console.log("No quiz for this article")
            setQuiz(undefined)
            setLoadingQuiz(false)
        }
    }, [article])

    useEffect(() => {
        if (!visited) {
            incrementViewCount()
                .then(() => console.log("View count incremented"))
                .catch(err => {
                    console.log("Couldn't increment view count, failing gracefully!")
                    console.log(err)
                })
            setVisited(false)
        }

        return () => {
            //TODO: compute time spent on page and update firebase 
            console.log("Leaving page")
        }
    }, [visited])

    useEffect(() => {
        const addArticleStarted = (a: Article) => {
            profile.articlesStartedID.push(a.id)
            setProfile(profile)
        }

        if (article && profile && profile.articlesCompletedID.includes(article.id)) {
            setProgress("complete")
        } else {
            if (article && profile && !profile.articlesStartedID.includes(article.id)) {
                updateStartedArticles(profile.uid, article.id).then(() => {
                    addArticleStarted(article)
                    console.log(profile)
                }).catch((err) => {
                    console.log("Failed to update started articles, failing gracefully.")
                    console.log(err)
                })
            } else {
                setProgress("started");
            }
        }
    }, [profile, article, setProfile])

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }, [])

    function markArticleComplete() {
        let newProfile: Profile = {
            ...profile
        }
        const articleIndex = profile.articlesStartedID.indexOf(article.id)
        if (articleIndex != -1) {
            newProfile.articlesStartedID.splice(articleIndex, 1)
        }
        if (!newProfile.articlesCompletedID.includes(article.id)) {
            newProfile.articlesCompletedID.push(article.id)
        }
        setProfile(newProfile)
        setProgress("complete")
        setWrongAns([])
        setConfetti(true)
        setTimeout(() => setConfetti(false), 5000)
    }


    async function handleQuizSubmit(answers: number[]) {
        setQuizCheckWorking(true)
        const quizID = article.id + "-quiz";
        const checkerResponse = await checkAnswers(quizID, article.id,
            article.sectionID, profile.uid, answers);
        console.log(checkerResponse)
        setQuizCheckWorking(false)
        switch (checkerResponse.verdict) {
            case "correct":
                markArticleComplete()
                break;
            case "incorrect":
                const incorrect = checkerResponse.wrong_ans;
                setWrongAns(incorrect)
                break;
            case "not-authenticated":
            case "error":
            case "already-completed":
            case "contest-not-live":
            default:
                setQuizError(checkerResponse.verdict)
                break;
        }
    }

    return <main className="flex flex-col items-center h-auto">
        {articleLoadError ?
            <ModalContainer>
                <Modal className="flex flex-col">
                    <h1 className={`font-mono text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
                    <p className="mb-4">It looks like the article you requested does not exist. Try going back to the articles and sections page to find an existing article. If the problem persists, contact us.</p>
                    <Link href={"/articles"} className={`font-mono btn-secondary`}> Go back to articles page </Link>
                </Modal>
            </ModalContainer>
            : ""
        }
        {
            quizError &&
            <ModalContainer>
                <Modal className="flex flex-col">
                    <h1 className={`font-mono text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
                    <p className="mb-4">An error occured while trying to submit your quiz. Error Code: <span className="font-mono">{quizError}</span></p>
                    <button onClick={() => setQuizError(undefined)} className="btn-secondary font-mono">Close</button>
                </Modal>
            </ModalContainer>
        }
        {
            confetti && <Confetti className="fixed top-0 left-0" style={{ position: "fixed" }} width={windowSize.width} height={windowSize.height} />
        }
        <div className="max-w-3xl w-full h-full p-4">
            <SkeletonTheme baseColor="#1e293b" highlightColor="#64748b">

                {(!loadingArticle && article && article.sponsor && showSponsor) ?
                    <div className="bg-slate-300 text-slate-950 p-4 rounded">
                        <div className="flex flex-row items-center">
                            <h1 className="text-xl flex-1">Sponsored by {article.sponsor.name}</h1>
                            <button className="p-1 rounded" onClick={() => setShowSponsor(false)}><EyeSlashIcon className="h-5 w-5" /></button>
                        </div>
                        <a href={article.sponsor.siteUrl} target="_blank"> <Image width={100} height={100} className="max-h-40 w-auto mt-2" alt={"Sponsor Logo"} src={article.sponsor.imageUrl} /></a>
                    </div> : ""
                }

                <div className="flex flex-row mt-5 items-center">
                    <h1 className={`text-4xl md:text-5xl font-bold flex-1`}>{!loadingArticle && article ? article.title : <Skeleton width={"10ch"} />}</h1>
                    {(!loadingArticle && profile) && <span className={`${progress == "complete" ? "bg-emerald-400" : "bg-sky-300"} text-slate-950 rounded p-2 text-sm font-mono flex gap-2 items-center font-bold`}> {progress} {progress == "complete" && <CheckCircleIcon height={10} width={15} className="h-7 w-7 text-sky-950" />}</span>}
                </div>
                <p className={`font-mono mt-2 text-slate-300 text-sm`}>{!loadingArticle && article ? article.description : <Skeleton />}</p>
                <div className={`font-mono flex gap-2 mt-2`}>
                    {!loadingArticle && article ? article.tags.map(tag => (
                        <div key={tag} className="bg-sky-300 text-slate-950 p-1 rounded-sm text-xs font-bold">
                            {tag}
                        </div>
                    )) : <Skeleton containerClassName="flex-1" />}
                </div>
                <hr className="mt-3 border-b border-slate-400" />

                {
                    !loadingArticle && article ?
                        <ArticleRenderer markdown={article.content} profile={profile} /> :
                        <div>
                            <p className="mt-5"><Skeleton className="mt-2" count={5} /></p>
                            <Skeleton className="my-4" height={200} />
                            <p><Skeleton className="mt-2" count={7} /></p>
                            <Skeleton className="my-4" height={200} />
                        </div>
                }

            </SkeletonTheme>
            <hr className="mt-6 border-b border-slate-400" />
        </div>
        <div className="max-w-3xl w-full h-full p-4">
            {profile && (
                (!loadingQuiz && quiz) ? <QuizPrompt quiz={quiz} onSumbit={handleQuizSubmit} working={quizCheckWorking} completed={progress == "complete"} wrongAns={wrongAns} /> :
                    !loadingQuiz ? <button className="btn-primary font-mono w-full">Mark Article Completed</button> : ""
            )}
            {!profile && (
                <div className="flex gap-4 flex-col md:flex-row md:items-center pb-4">
                    <div className="">
                        <h1 className="font-bold text-2xl"> Log in to complete quizzes and track your progress! </h1>
                    </div>
                    <div className="min-w-48">
                        <button className="font-mono btn-primary w-full" onClick={() => signInOrRegister()}> Log in / Sign up </button>
                    </div>
                </div>
            )}
        </div>
    </main>
}
