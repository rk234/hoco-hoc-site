"use client"

import { useProfile } from "@/app/components/auth-provider/authProvider"
import { Article, Section, getAllArticles, getSections } from "@/app/services/articleService";
import Link from "next/link";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query";

export default function AdminContentPage() {
    let profile = useProfile()
    const { data: sections, isLoading: loadingSections, error: sectionLoadErr } = useQuery({
        queryKey: ["sections"],
        queryFn: getSections,
    })

    const { data: articles, isLoading: loadingArticles, error: articleLoadErr } = useQuery({
        queryKey: ["articles"],
        queryFn: getAllArticles,
    })

    function articlesForSection(section: Section): Article[] {
        if (articles) {
            return articles.filter(article => {
                let found = section.articles.find((ref) => ref.id == article.id)
                return found ? true : false
            })
        } else {
            return []
        }
    }

    return <main>

        {
            (profile && profile.admin) ?
                <div className="w-full h-auto flex justify-center">
                    <div className="max-w-3xl w-full h-full p-4 flex flex-col gap-2">
                        <div className="p-2 bg-amber-400 text-slate-900 rounded flex items-center gap-2">
                            <ExclamationCircleIcon className="w-16 h-16" />
                            <p><span className="font-bold">Warning:</span> Changes made here will impact content on the site! Make sure to double-check your edits and backup work if necesssary. <span className="font-bold">Changes can not be undone easily if at all!</span> </p>
                        </div>
                        <h1 className="font-bold text-2xl">Manage Content</h1>
                        <Link href={`/admin/content/section`} className="btn-primary font-mono">Add New Section</Link>
                        {!loadingSections && !sectionLoadErr && sections.map(section =>
                            <div key={section.id} className="border-2 border-slate-700 rounded">
                                <div className="flex flex-row items-center bg-slate-800 gap-2 p-2 border-b-2 border-b-slate-700">
                                    <p key={section.id} className="font-bold">{section.title}</p>
                                    <Link href={`/admin/content/section?id=${section.id}`} className="btn-secondary font-mono ml-auto text-sm">Edit Section</Link>
                                    <Link href={`/admin/content/article?section=${section.id}`} className="btn-secondary font-mono text-sm">Add Article</Link>
                                </div>
                                <div className="bg-slate-800 space-y-1">
                                    {articlesForSection(section).map(article => {
                                        return <div key={article.id} className="flex items-center border-b-2 border-b-slate-700 p-2">
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
                <p className="p-2">You don&apos;t have admin permissions. If you think this is a mistake, contact us.</p>
        }
    </main>
}
