"use client"

import { useProfile } from "@/app/components/auth-provider/authProvider"
import { Article, Section, getAllArticles, getSections  } from "@/app/services/articleService";
import Link from "next/link";
import { useEffect, useState } from "react"
import {ExclamationCircleIcon} from "@heroicons/react/24/outline"

export default function AdminContentPage() {
    let profile = useProfile()
    let [sections, setSections] = useState<Section[]>([])
    let [articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        if(sections.length == 0 && articles.length == 0) {

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

    function articlesForSection(section: Section): Article[] {
        return articles.filter(article => {
            let found = section.articles.find((ref) => ref.id == article.id)
            return found ? true : false
        })
    }

    return <main>
        
        {
        (profile && profile.admin) ? 
        <div className="w-full h-auto flex justify-center">
            <div className="max-w-3xl w-full h-full p-4 flex flex-col gap-2">
                <div className="p-2 bg-amber-400 text-slate-900 rounded-sm flex items-center gap-2">
                    <ExclamationCircleIcon className="w-16 h-16"/>
                    <p><span className="font-bold">Warning:</span> Changes made here will impact content on the site! Make sure to double-check your edits and backup work if necesssary. <span className="font-bold">Changes can not be undone easily if at all!</span> </p>
                </div>
                <h1 className="font-bold text-2xl">Manage Content</h1>
                <Link href={`/admin/content/section`} className="btn-primary font-mono">Add New Section</Link>
                {sections.map(section => 
                    <div key={section.id} className="border-2 border-slate-700 rounded">
                        <div className="flex flex-row items-center bg-slate-800 gap-2 p-2">
                            <p key={section.id} className="font-bold">{section.title}</p>
                            <Link href={`/admin/content/section?id=${section.id}`} className="btn-secondary font-mono ml-auto text-sm">Edit Section</Link>
                            <Link href={`/admin/content/article?section=${section.id}`}  className="btn-secondary font-mono text-sm">Add Article</Link>
                        </div>
                        <div className="p-1 bg-slate-700 space-y-1">
                            {articlesForSection(section).map(article => {
                                return <div key={article.id} className="flex items-center bg-slate-800 p-2 rounded">
                                    <div className="flex-1">
                                        <p>{article.title}</p>
                                        <span className="font-mono text-xs">(ID: {article.id})</span>
                                    </div>
                                    <Link href={`/admin/content/article?section=${section.id}&id=${article.id}`} className="btn-secondary font-mono text-sm">
                                        Edit
                                    </Link>
                                </div>
                            })}
                        </div>
                       
                    </div>
                )}
            </div>
        </div> : 
        <p className="p-2">You don't have admin permissions. If you think this is a mistake, contact us.</p>
        }
    </main>
}