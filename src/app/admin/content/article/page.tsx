"use client"
import ArticleEditor from "@/app/components/admin/articleEditor"
import SectionEditor from "@/app/components/admin/sectionEditor"
import { useProfile } from "@/app/components/auth-provider/authProvider"
import { Article, Section, createArticle, createSection, getArticleFromID, getSection } from "@/app/services/articleService"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function AdminArticleEditPage() {
    const placeHolderID = "[REPLACE WITH THE ID YOU WANT]";
    const defaultArticle: Article = {
        id: placeHolderID,
        title: "Untitled article",
        description: "Description...",
        content: "Some content...",
        tags: [],
    }

    let profile = useProfile()
    const router = useRouter()
    const params = useSearchParams()
    let [article, setArticle] = useState<Article>(defaultArticle)
    let [editing, setEditing] = useState(false);

    useEffect(() => {
        if(params.get("id") && params.get("section")) {
            setEditing(true)
            console.log(article)
            if(article.id == placeHolderID) {
                console.log("fetching new")
                getArticleFromID(params.get("id")).then(article => {
                    setArticle(article)
                    //console.log(section)
                }).catch(err => {
                    alert("An error occured, see the console!")
                    console.log(err)
                })
            }
        } else {
            //New
            setEditing(false)
        }
    }, [article, params])

    function handleSave(article: Article, sectionID: string) {
        console.log(article)
        console.log(sectionID)
        createArticle(article, sectionID).then(() => {
            alert("Section successfully updated/created!")
            router.back()
        }).catch(err => {
            alert("An error occured, see the console!")
            console.log(err)
        })
    }

    function handleCancel() {
        router.back()
    }

    return <main className="h-full">
        {(profile && profile.admin) ? 
        <div className="w-full h-full flex justify-center">
            <div className="w-full h-full flex flex-col gap-2">
                <ArticleEditor sectionID={params.get("section")} article={article} editing={editing} onSave={handleSave} onCancel={handleCancel}></ArticleEditor>
            </div>
        </div> : <p className="p-2">You don&apos;t have admin permissions. If you think this is a mistake, contact us.</p>}    
    </main>
}