"use client"
import { Profile } from "@/app/services/userService"
import SectionProgressCard from "../section-progress-card/sectionProgressCard"
import { useEffect, useState } from "react";
import { Article, Section, getAllArticles, getSections } from "@/app/services/articleService";
import Link from "next/link";
import ArticleCard from "../article-card/articleCard";

type Props = {
  profile: Profile
}

export default function ProfileDashboard(props: Props) {
  let [sections, setSections] = useState<Section[]>([]);
  let [loadingSections, setLoadingSections] = useState(false)
  let [startedArticles, setStartedArticles] = useState<Article[]>([])
  let [completedArticles, setCompletedArticles] = useState<Article[]>([])
  let [loadingArticles, setLoadingArticles] = useState(false)
  let [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getSections().then((sections) => {
      setSections(sections)
      setLoadingSections(false)
      setError(false)
    }).catch(err => {
      setError(true)
    })
  }, [])

  useEffect(() => {
    getAllArticles().then((articles) => {
      setStartedArticles(articles.filter(a => props.profile.articlesStartedID.includes(a.id)))
      setCompletedArticles(articles.filter(a => props.profile.articlesCompletedID.includes(a.id)))
      setError(false)
      setLoadingArticles(false)
    }).catch(err => {
      setError(true)
    })
  }, [props.profile])

  return <main className="w-full h-full flex flex-col gap-4">
    <div className="flex flex-row flex-wrap w-full items-stretch gap-4">
      {sections.map(section =>
        <SectionProgressCard className="flex-1 min-w-48 h-48" key={section.id} section={section} points={props.profile.scores[section.id]} />
      )}
    </div>
    <div className="grid grid-cols-1 flex-1 gap-4">
      <div className="rounded bg-slate-800">
        <div className="p-4 pb-2">
          <h1 className="text-xl font-bold"> Jump Back In </h1>
        </div>
        <div className="flex flex-row max-w-full gap-2 p-4 pt-2 overflow-x-scroll overflow-y-hidden">
          {startedArticles.map(art => <ArticleCard complete={false} key={art.id} article={art} />)}
        </div>
      </div>
      <div className="rounded bg-slate-800">
        <div className="p-4 pb-2">
          <h1 className="text-xl font-bold"> Recently Completed </h1>
        </div>
        <div className="flex flex-row max-w-full gap-2 p-4 pt-2 overflow-x-scroll overflow-y-hidden">
          {completedArticles.map(art => <ArticleCard key={art.id} complete={true} article={art} />)}
        </div>
      </div>
    </div>
  </main>
}
