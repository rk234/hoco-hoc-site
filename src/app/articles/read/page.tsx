"use client"

import { getArticleFromID, Article } from "@/app/services/articleService"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { JetBrains_Mono } from "next/font/google"
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TabContainer from "../../components/tab-container/tabContainer"
import Skeleton from 'react-loading-skeleton'
import {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const jbm = JetBrains_Mono(
    {subsets: ["latin"]}
)

export default function Read() {
    const params = useSearchParams()
    let [article, setArticle] = useState<Article>()
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!article) {
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

    
    return <main className="flex justify-center h-auto">
        <div className="max-w-3xl w-full h-full p-4">
            <SkeletonTheme baseColor="#1e293b" highlightColor="#64748b">
                <h1 className={`text-4xl md:text-5xl font-bold mt-5`}>{!loading ? article.title : <Skeleton width={"10ch"} />}</h1>
                <p className={`${jbm.className} mt-2 text-slate-300 text-sm`}>{!loading ? article.description : <Skeleton />}</p>    
                <div className={`${jbm.className} flex gap-2 mt-2`}>
                    {article ? article.tags.map(tag => (
                        <div key={tag} className="bg-sky-300 text-slate-950 p-1 rounded-sm text-xs font-bold">
                            {tag}
                        </div>
                    )) : <Skeleton containerClassName="flex-1"/>}
                </div>
                <hr className="mt-3 border-b border-slate-400"/>
                {article ? <Markdown
                    className={"prose leading-relaxed my-4 prose-invert prose-headings:mt-5 prose-headings:mb-2 prose-ul:mt-0 prose-pre:bg-transparent prose-pre:p-0 prose-li:my-2"}
                    components={{
                    code(props) {
                        const { children, className, node, ...rest } = props;
                        //console.log(node)
                        let langs = className.split('-')[1].split(',');
                        let examples = (children as string).split('\n%%\n');

                        let renderResult = [];
                        for (var i = 0; i < langs.length; i++) {
                        renderResult.push(
                            <SyntaxHighlighter
                            PreTag="div"
                            language={langs[i]}
                            style={{...theme}}
                            codeTagProps={{className: jbm.className}}
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
                </Markdown> : 
                <div>
                    <p className="mt-5"><Skeleton className="mt-2" count={5}/></p>
                    <Skeleton className="my-4" height={200}/>
                    <p><Skeleton className="mt-2" count={7}/></p>
                    <Skeleton className="my-4" height={200}/>
                </div>}
            </SkeletonTheme>
        </div>
    </main>
}