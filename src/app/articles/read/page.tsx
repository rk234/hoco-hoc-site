"use client"

import { getArticleFromID, Article } from "@/app/services/articleService"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TabContainer from "../../components/tab-container/tabContainer"
import Skeleton from 'react-loading-skeleton'
import {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Modal from "@/app/components/modal/modal"
import Link from "next/link"
import ModalContainer from "@/app/components/modal/modalContainer"
import { useProfile } from "@/app/components/auth-provider/authProvider";
import Image from "next/image";

import {EyeSlashIcon} from "@heroicons/react/24/solid"

export default function Read() {
    const params = useSearchParams()
    let [article, setArticle] = useState<Article>()
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(false)
    let [showSponsor, setShowSponsor] = useState(true)
    let profile = useProfile()

    useEffect(() => {
        if(!article) {
            setLoading(true)
            let id = params.get("article")
            if(id) {
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
                        <button className="p-1 rounded" onClick={() => setShowSponsor(false)}><EyeSlashIcon className="h-5 w-5"/></button>
                    </div>
                    <a href={article.sponsor.siteUrl} target="_blank"> <Image width={100} height={100} className="max-h-40 w-auto mt-2" alt={"Sponsor Logo"} src={article.sponsor.imageUrl} /></a>
                </div> : ""
                }

                <h1 className={`text-4xl md:text-5xl font-bold mt-5`}>{!loading && article ? article.title : <Skeleton width={"10ch"} />}</h1>
                <p className={`font-mono mt-2 text-slate-300 text-sm`}>{!loading && article ? article.description : <Skeleton />}</p>    
                <div className={`font-mono flex gap-2 mt-2`}>
                    {!loading && article ? article.tags.map(tag => (
                        <div key={tag} className="bg-sky-300 text-slate-950 p-1 rounded-sm text-xs font-bold">
                            {tag}
                        </div>
                    )) : <Skeleton containerClassName="flex-1"/>}
                </div>
                <hr className="mt-3 border-b border-slate-400"/>
                {!loading && article ? <Markdown
                    className={"prose prose-slate leading-snug my-4 prose-invert prose-headings:mt-5 prose-headings:mb-2 prose-ul:mt-0 prose-pre:bg-transparent prose-pre:p-0 prose-li:my-1"}
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
                            codeTagProps={{className: "font-mono"}}
                            showLineNumbers={true}
                            showInlineLineNumbers={true}
                            wrapLongLines={false}
                            >
                                {examples[i].trim()}
                            </SyntaxHighlighter>
                        );
                        }
                        return (
                            <TabContainer selected={profile ? profile.preferredLanguage : undefined} langs={langs} components={renderResult} />
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