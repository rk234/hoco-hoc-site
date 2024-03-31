"use client"
import { Profile } from "@/app/services/userService"
import SectionProgressCard from "../section-progress-card/sectionProgressCard"
import { useEffect, useState } from "react";
import { Article, Section, getAllArticles, getSections } from "@/app/services/articleService";
import ArticleCard from "../article-card/articleCard";
import ModalContainer from "../modal/modalContainer";
import Modal from "../modal/modal";

type Props = {
  profile: Profile
}

export default function ProfileDashboard(props: Props) {
  let [sections, setSections] = useState<Section[]>([]);
  let [loadingSections, setLoadingSections] = useState(true)
  let [startedArticles, setStartedArticles] = useState<Article[]>([])
  let [completedArticles, setCompletedArticles] = useState<Article[]>([])
  let [loadingArticles, setLoadingArticles] = useState(true)
  let [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    getSections().then((sections) => {
      setSections(sections)
      setLoadingSections(false)
      setError(undefined)
    }).catch(err => {
      console.log(err)
      setError(err)
    })
  }, [])

  useEffect(() => {
    getAllArticles().then((articles) => {
      setStartedArticles(articles.filter(a => props.profile.articlesStartedID.includes(a.id)))
      setCompletedArticles(articles.filter(a => props.profile.articlesCompletedID.includes(a.id)))
      setError(undefined)
      setLoadingArticles(undefined)
    }).catch(err => {
      console.log(err)
      setError(err)
    })
  }, [props.profile])

  return <main className="w-full h-full flex flex-col gap-4">
    {error && (
      <ModalContainer>
        <Modal className="flex flex-col">
          <h1 className={`font-mono text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
          <p className="mb-4">An error occured while loading. Error Code: <span className="font-mono">{error.name} - {error.message}</span></p>
        </Modal>
      </ModalContainer>
    )}
    <div className="flex flex-row flex-wrap w-full items-stretch gap-4">
      {!loadingSections ? (
        sections.map(section =>
          <SectionProgressCard className="flex-1 min-w-64 h-52" key={section.id} section={section} points={props.profile.scores[section.id]} />
        )
      ) : (
        Array.from(Array(3), (_, i) => <div key={i} className="h-52 min-w-48 flex-1 animate-pulse bg-slate-800 rounded"> </div>)
      )}
    </div>
    <div className="grid grid-cols-1 flex-1 gap-4">
      <div className="rounded bg-slate-800">
        <div className="p-4 pb-2">
          <h1 className="text-xl font-bold"> Jump Back In </h1>
        </div>
        <div className="flex flex-row max-w-full gap-2 p-4 pt-2 overflow-x-scroll overflow-y-hidden">
          {!loadingArticles ? (
            startedArticles.map(art => <ArticleCard complete={false} key={art.id} article={art} />)
          ) : (
            Array.from(Array(10), (_, i) => <div key={i} className="flex-1 min-h-44 min-w-60 animate-pulse bg-slate-700 rounded" />)
          )}
          {!loadingArticles && startedArticles.length == 0 && (
            <div className="flex-1 flex items-center min-h-44 justify-center">
              <h1> Looks pretty empty here. Start reading articles to make progress! </h1>
            </div>
          )}
        </div>
      </div>
      <div className="rounded bg-slate-800">
        <div className="p-4 pb-2">
          <h1 className="text-xl font-bold"> Recently Completed </h1>
        </div>
        <div className="flex flex-row max-w-full gap-2 p-4 pt-2 overflow-x-scroll overflow-y-hidden">
          {!loadingArticles ? (
            completedArticles.map(art => <ArticleCard complete={false} key={art.id} article={art} />)
          ) : (
            Array.from(Array(10), (_, i) => <div key={i} className="flex-1 min-h-44 min-w-60 animate-pulse bg-slate-700 rounded" />)
          )}
          {!loadingArticles && completedArticles.length == 0 && (
            <div className="flex-1 flex items-center min-h-44 justify-center">
              <h1> Looks pretty empty here. Start reading articles to make progress! </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  </main>
}
