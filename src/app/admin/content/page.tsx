"use client"

import { useProfile } from "@/app/components/auth-provider/authProvider"
import { Article, Section, getAllArticles, getSections  } from "@/app/services/articleService";
import { useEffect, useState } from "react"

export default function AdminContentPage() {
    let profile = useProfile()
    let [sections, setSections] = useState<Section[]>([]);
    let [articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        if(profile && profile.admin && sections.length == 0 && articles.length == 0) {
            Promise.all([getSections(), getAllArticles()]).then((data) => {
                let sections = data[0]
                let articles = data[1]
                
                setArticles(articles)
                setSections(sections)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [sections, articles])

    return <main>
        {
        (profile && profile.admin) ? 
        <div className="w-full h-auto flex justify-center">
            <div className="max-w-3xl w-full h-full p-4">
                
            </div>
        </div> : 
        <p className="p-2">You don't have admin permissions. If you think this is a mistake, contact us.</p>
        }
    </main>
}