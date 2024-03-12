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
import { updateStartedArticles } from "@/app/services/userService"
import QuizRenderer from "@/app/components/quiz-renderer/QuizRenderer"
import { Quiz } from "@/app/services/quizService"

export default function Read() {
    const params = useSearchParams()
    let [article, setArticle] = useState<Article>()
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(false)
    let [showSponsor, setShowSponsor] = useState(true)
    let [visited, setVisited] = useState(false)
    let [progress, setProgress] = useState<"started" | "complete">("started")
    let profile = useProfile()
    let setProfile = useProfileUpdate()

    useEffect(() => {
        if (!article) {
            setLoading(true)
            let id = params.get("article")
            if (id) {
                getArticleFromID(id).then(article => {
                    setArticle(article)
                    setLoading(false)
                }).catch(err => {
                    setError(true)
                    setLoading(false)
                    console.log(err)
                })
            } else {
                setError(true)
                setLoading(false)
            }
        }
    }, [article, loading, params])

    useEffect(() => {
        if (article && article.quiz) {
            console.log("Article has quiz!")
        } else {
            console.log("Article does not have quiz")
        }
    }, [article])

    useEffect(() => {
        const handleUnload = (event) => {
            console.log("Unload!")
            alert("Hello")
        }

        window.addEventListener("pagehide", handleUnload)

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
            window.removeEventListener("pagehide", handleUnload)
        }
    }, [visited])

    useEffect(() => {
        const addArticleStarted = (a: Article) => {
            profile.articlesStartedID.push(a.id)
            setProfile(profile)
        }


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
    }, [profile, article, setProfile])


    return <main className="flex justify-center h-auto">
        {error ?
            <ModalContainer>
                <Modal className="flex flex-col">
                    <h1 className={`font-mono text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
                    <p className="mb-4">It looks like the article you requested does not exist. Try going back to the articles and sections page to find an existing article. If the problem persists, contact us.</p>
                    <Link href={"/articles"} className={`font-mono btn-secondary`}> Go back to articles page </Link>
                </Modal>
            </ModalContainer>
            : ""}
        <div className="max-w-3xl w-full h-full p-4">
            <SkeletonTheme baseColor="#1e293b" highlightColor="#64748b">

                {(!loading && article && article.sponsor && showSponsor) ?
                    <div className="bg-slate-300 text-slate-950 p-4 rounded">
                        <div className="flex flex-row items-center">
                            <h1 className="text-xl flex-1">Sponsored by {article.sponsor.name}</h1>
                            <button className="p-1 rounded" onClick={() => setShowSponsor(false)}><EyeSlashIcon className="h-5 w-5" /></button>
                        </div>
                        <a href={article.sponsor.siteUrl} target="_blank"> <Image width={100} height={100} className="max-h-40 w-auto mt-2" alt={"Sponsor Logo"} src={article.sponsor.imageUrl} /></a>
                    </div> : ""
                }

                <div className="flex flex-row mt-5 items-center">
                    <h1 className={`text-4xl md:text-5xl font-bold flex-1`}>{!loading && article ? article.title : <Skeleton width={"10ch"} />}</h1>
                    {(!loading && profile) && <span className={`${progress == "complete" ? "bg-emerald-400" : "bg-sky-300"} text-slate-950 rounded p-2 text-sm font-mono flex gap-2 items-center`}> {progress} {progress == "complete" && <CheckCircleIcon height={10} width={15} className="h-5 w-5 text-slate-950" />}</span>}
                </div>
                <p className={`font-mono mt-2 text-slate-300 text-sm`}>{!loading && article ? article.description : <Skeleton />}</p>
                <div className={`font-mono flex gap-2 mt-2`}>
                    {!loading && article ? article.tags.map(tag => (
                        <div key={tag} className="bg-sky-300 text-slate-950 p-1 rounded-sm text-xs font-bold">
                            {tag}
                        </div>
                    )) : <Skeleton containerClassName="flex-1" />}
                </div>
                <hr className="mt-3 border-b border-slate-400" />
                {!loading && article ? <ArticleRenderer markdown={article.content} profile={profile} /> :
                    <div>
                        <p className="mt-5"><Skeleton className="mt-2" count={5} /></p>
                        <Skeleton className="my-4" height={200} />
                        <p><Skeleton className="mt-2" count={7} /></p>
                        <Skeleton className="my-4" height={200} />
                    </div>}

            </SkeletonTheme>
        </div>
    </main>
}
