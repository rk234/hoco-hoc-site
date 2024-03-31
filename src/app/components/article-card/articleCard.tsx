import { Article } from "@/app/services/articleService";
import { truncate } from "@/app/services/utils";
import Link from "next/link";

type Props = {
  article: Article
  complete: boolean
}

export default function ArticleCard(props: Props) {
  return <Link href={`/articles/read?article=${props.article.id}`} className="p-2 border rounded min-h-44 min-w-60 border-slate-700 flex flex-col" >
    <div className="flex flex-row justify-start">
      <div className="flex-1">
        <h1 className="font-bold text-lg"> {props.article.title} </h1>
      </div>
      <div>
        <p className="font-mono text-sm bg-slate-700 rounded p-1">
          {props.article.quiz ? props.article.quiz.points + "pts" : "NQ"}
        </p>
      </div>
    </div>
    <p className="text-sm text-slate-300 mt-2 overflow-hidden text-ellipsis"> {truncate(props.article.description, 75)} </p>
    {!props.complete ?
      <Link href={`/articles/read?article=${props.article.id}`} className="text-sm font-mono font-bold text-sky-400 mt-auto"> Continue Reading -&gt;</Link>
      : <Link href={`/articles/read?article=${props.article.id}`} className="text-sm font-mono font-bold text-emerald-400 mt-auto"> Complete </Link>
    }
  </Link>
}
