"use client"

import { useEffect, useState } from "react"
import { getAllArticles, getSections, Article } from "../services/articleService"
import Link from "next/link"
import ModalContainer from "../components/modal/modalContainer"
import Modal from "../components/modal/modal"
import { JetBrains_Mono } from "next/font/google"
import { useRouter } from "next/navigation"

const jbm = JetBrains_Mono({subsets: ["latin"]})

export default function Articles() {
    let [sections, setSections] = useState([])
    let [error, setError] = useState(false);
    const router = useRouter()
     
    useEffect(() => {
        fetchSections()
    }, [sections])

    function fetchSections() {
        if(sections.length == 0) {
            console.log(
                "fetch"
            )
            fetchData().then(secs => {
                setSections(secs)
                setError(false)
            }).catch(err => {
                console.log(err)
                setError(true)
            })
        }
    }

    async function fetchData() {
        let sections = await getSections()
        let articles = await getAllArticles()

        let hydrated = []

        sections.sort((a, b) => a.index-b.index)
        sections.forEach(section => {
            let sectionObj = {
                id: section.id,
                index: section.index,
                title: section.title,
                description: section.description,
                articles: [] as Article[]
            }
            sectionObj.articles = section.articles.map(article => articles.find(a => a.id == article.id))
            hydrated.push(sectionObj)
        })
        
        console.log("FETCH!!!!")
        return hydrated
    }

    return <main className="p-4">
        {error ? <ModalContainer>
            <Modal className="flex flex-col">
                <h1 className={`${jbm.className} text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
                <p className="mb-4">An error occured while fetching articles and sections. Try again or contact us if the problem persists.</p>
                <button onClick={() => fetchData()} className={`${jbm.className} btn-secondary text-left`}> Try Again </button>
            </Modal>
        </ModalContainer> : ""}
        <h1>Sections:</h1>
        <ul className="list-disc ml-4 mt-5">
        {sections.map(section => {
            return (<li key={section.id}>
                <p className="font-bold text-lg">{section.title}</p>
                <p>{section.description}</p>
                <ol className="list-decimal ml-6 mt-2">
                    {section.articles.map(article => {
                        return <li key={article.id}>[ID: {article.id}]: <Link className="link" href={`/articles/read?article=${article.id}`}>{article.title} - {article.description}</Link></li>
                    })}
                </ol>
            </li>)
        })}
        </ul>
    </main>
}