"use client"

import { useEffect, useState } from "react"
import { getAllArticles, getSections, Article } from "../services/articleService"
import Link from "next/link"

export default function Articles() {
    let [sections, setSections] = useState([])
    
    useEffect(() => {
        if(sections.length == 0) {
            fetchData().then(secs => {
                setSections(secs)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [sections])

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