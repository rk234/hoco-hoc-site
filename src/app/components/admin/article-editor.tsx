"use client"

import { Article } from "@/app/services/articleService"
import { useEffect, useState } from "react"

type Props = {
    article: Article
    sectionID: string
    editing: boolean
    onSave: (section: Article, sectionID: string) => void
    onCancel: () => void
}

export default function ArticleEditor(props: Props) {
    let [article, setArticle] = useState<Article>(props.article)
    let [sectionID, setSectionID] = useState<string>(props.sectionID)

    useEffect(() => {
        setArticle(props.article)
        setSectionID(props.sectionID)
    }, [props.article, props.sectionID])

    return <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{props.editing ? "Edit Article" : "Create Article"}</h1>
        {!props.editing ? <div>
            <label>Article ID: </label>
            <input type="text" placeholder="ID" value={article.id} onChange={(e) => setArticle({...article, id: e.target.value})}></input>
        </div>: ""}
        <div>
            <label>Article Section ID: </label>
            <input type="text" placeholder="Section ID" value={props.sectionID} onChange={(e) => setSectionID(e.target.value)}></input>
        </div>
        <p>Article Title</p>
        <input type="text" placeholder="Title" value={article.title} onChange={(e) => setArticle({...article, title: e.target.value})}></input>
        <p>Description</p>
        <textarea value={article.description} onChange={e => setArticle({...article, description: e.target.value})}></textarea>
        <p>Tags (Comma separated)</p>
        <input type="text" value={article.tags.join(",")} onChange={(e) => setArticle({...article, tags: (e.target.value.split(","))})}></input>
        <p>Content in Markdown Format</p>
        <textarea value={article.content} onChange={e => setArticle({...article, content: e.target.value})}></textarea>
        <div className="flex flex-row gap-1">
            <button className="btn-primary font-mono flex-1" onClick={() => props.onSave(article, sectionID)}> {props.editing ? "Save" : "Create"} </button>
            <button className="btn-secondary font-mono" onClick={props.onCancel}> Cancel </button>
        </div>
    </div>
}