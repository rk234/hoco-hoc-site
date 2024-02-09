"use client"

import { _test_setMd, getArticleContent, getArticleFromID } from "@/app/services/articleService"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { JetBrains_Mono } from "next/font/google"
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TabContainer from "../../components/tab-container/tabContainer"

const jbm = JetBrains_Mono(
    {subsets: ["latin"]}
)

export default function Read() {
    const params = useSearchParams()
    let [article, setArticle] = useState({})
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!article.title) {
            setLoading(true)
            let id = params.get("article")
            if(id) {
                getArticleFromID(id).then(article => {
                    console.log(article)
                    setArticle(article)
                    setLoading(false)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }, [article, loading, params])

    
    return <main className="flex justify-center h-full">
        <div className="max-w-3xl w-full h-full p-4">
            <h1 className={`text-4xl font-bold mt-5`}>{article.title}</h1>
            <p className={`${jbm.className} mt-2 text-slate-300 text-sm`}>{article.description}</p>    
            <div className={`${jbm.className} flex gap-2 mt-2`}>
                {article.tags ? article.tags.map(tag => (
                    <div key={tag} className="bg-sky-300 text-slate-950 p-1 rounded-sm text-xs font-bold">
                        {tag}
                    </div>
                )) : ""}
            </div>
            <hr className="mt-3 border-b border-slate-400"/>
            {article.content ? <Markdown
                className={"markdown"}
                components={{
                code(props) {
                    const { children, className, node, ...rest } = props;
                    //console.log(node)
                    let langs = className.split('-')[1].split(',');
                    let examples = children.split('\n%%\n');

                    let renderResult = [];
                    for (var i = 0; i < langs.length; i++) {
                    renderResult.push(
                        <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        language={langs[i]}
                        style={{...theme}}
                        showLineNumbers={true}
                        showInlineLineNumbers={true}
                        wrapLongLines={false}
                        >
                            {examples[i].trim()}
                        </SyntaxHighlighter>
                    );
                    }
                    return (
                    <TabContainer langs={langs} components={renderResult} />
                    );
                }
                }}
            >
                {article.content}
            </Markdown> : ""}
        </div>
    </main>
}