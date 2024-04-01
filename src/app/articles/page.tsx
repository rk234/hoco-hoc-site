"use client"

import { useCallback, useEffect, useState } from "react"
import { getAllArticles, getSections, Article } from "../services/articleService"
import { motion } from "framer-motion";
import Link from "next/link"
import ModalContainer from "../components/modal/modalContainer"
import Modal from "../components/modal/modal"
import { useRouter } from "next/navigation"
import "./page.css"

type PopulatedSection = {
    id: string,
    index: number,
    title: string,
    description: string,
    articles: Article[]
}

export default function Articles() {
    let [sections, setSections] = useState<PopulatedSection[]>([])
    let [error, setError] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const loadSections = useCallback(fetchSections, [sections])
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({}); // Track expanded state for each section
     

    useEffect(() => {
        loadSections()
    }, [loadSections])

    function fetchSections() {
        if (sections.length == 0) {
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
        let [sections, articles] = await Promise.all([getSections(), getAllArticles()])

        let hydrated = []

        sections.sort((a, b) => a.index - b.index)
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


    function toggleSectionExpansion(sectionId: string) {
        setExpandedSections(prevState => ({
            ...prevState,
            [sectionId]: !prevState[sectionId] // Toggle the state
        }));
    }



    return <main className="p-4">
        {error ? <ModalContainer>
            <Modal className="flex flex-col">
                <h1 className={`font-mono text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
                <p className="mb-4">An error occured while fetching articles and sections. Try again or contact us if the problem persists.</p>
                <button onClick={() => fetchData()} className={`font-mono btn-secondary text-left`}> Try Again </button>
            </Modal>
        </ModalContainer> : ""}
        <h1 className="font-mono text-6xl text-center mb-3 "> Articles </h1>
        <p className="font-mono text-md mx-auto text-center w-3/5 text-slate-400">
            Complete articles to get points, which are transformed into raffle tickets and earns your school points!
        </p>
        <div className="">
            <div id="buttons" className="flex justify-center gap-2 bg-sky-900 sm:w-1/2 lg:w-1/3 m-3 p-3 mx-auto rounded-lg">
                <div className="flex flex-col items-center mr-2">
                    <div className="rounded-full bg-slate-300 w-16 h-16 flex items-center justify-center text-center hover:cursor-pointer hover:-translate-y-1.5 ease-in-out duration-300">
                        <span className="text-black">##</span>
                    </div>
                    <span className="text-center hover:cursor-pointer">Section 1</span>
                </div>

                <div className="flex flex-col items-center mr-2">
                    <div className="rounded-full bg-slate-300 w-16 h-16 flex items-center justify-center text-center hover:cursor-pointer hover:-translate-y-1.5 ease-in-out duration-300">
                        <span className="text-black">##</span>
                    </div>
                    <span className="text-center hover:cursor-pointer">Section 2</span>
                </div>

                <div className="flex flex-col items-center mr-2">
                    <div className="rounded-full bg-slate-300 w-16 h-16 flex items-center justify-center text-center hover:cursor-pointer hover:-translate-y-1.5 ease-in-out duration-300">
                        <span className="text-black">##</span>
                    </div>
                    <span className="text-center hover:cursor-pointer">Section 3</span>
                </div>

                <div className="flex flex-col items-center mr-2">
                    <div className="rounded-full bg-slate-300 w-16 h-16 flex items-center justify-center text-center hover:cursor-pointer hover:-translate-y-1.5 ease-in-out duration-300">
                        <span className="text-black">##</span>
                    </div>
                    <span className="text-center hover:cursor-pointer">Section 4</span>
                </div>
            </div>
            <div>
                <div className="flex justify-center mt-4">
                    <div className="bg-sky-700 rounded-full md:w-1/2 w-full h-3">
                        <div style={{ width: "70%" }} className="h-full bg-sky-600 rounded-full"></div>
                    </div>
                </div>
                <div className="mx-auto w-1/2 mt-1">
                    <p className="sm:text-right text-center"> 0 / 273 tasks completed</p>
                </div>
            </div>
        </div>

        <ul className="list-disc ml-4 mt-5">
            {sections.map((section, index) => {
                return (
                    <div key={index}>
                        <div key={index} className="md:flex gap-4 justify-center "
                            onClick={() => toggleSectionExpansion(section.id)}>
                            <div className="hover:-translate-y-2 bg-blue-950 cursor-pointer p-4 rounded-lg border mb-4 md:w-1/2 ease-in-out duration-300 hover:shadow-xl hover:shadow-indigo-500/50">
                                <p className="font-bold font-['Menlo']">{section.title}</p>
                                <p className="pt-4 font-mono">{section.description}</p>
                                <div className="flex">
                                    <Link className="link no-underline pt-3" href={''}>
                                        Learn More
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 inline-block"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {expandedSections[section.id] &&
                            section.articles.map((article, articleIndex) => (
                                <Link href={`/articles/read?article=${article.id}`} passHref>
                                    <motion.div
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -100, opacity: 0 }}
                                        transition={{ duration: articleIndex/4}}
                                    >
                                        <div key={articleIndex} className={`md:flex gap-4 justify-center`}>
                                            <div className="flex justify-left hover:-translate-y-2 bg-indigo-900 cursor-pointer p-4 rounded-lg border md:w-1/2 mb-4 ease-in-out duration-300 hover:shadow-xl hover:shadow-indigo-500/50">
                                                <ul className="justify-left">
                                                    <li>
                                                        <div className="flex flex-row ml-3 justify-left">
                                                            <div className="text-xl font-mono">{article.title}</div>
                                                            <div className="ml-3 pl-2 pr-2 h-1/6 bg-cyan-500 rounded-lg">
                                                                To-Do
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row mt-2 ">
                                                            {article.tags.map((tag, tagIndex) => (
                                                                <div key={tagIndex} className="ml-3 pl-2 pr-2 bg-cyan-500 rounded-lg"> {tag} </div>
                                                            ))}
                                                        </div>
                                                        <div className="ml-3 mt-2">
                                                            <p className="text-lg text-slate-400"> {article.description}</p>
                                                        </div>

                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                    </div>
                );
            })}
        </ul>
    </main>
}
