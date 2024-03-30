import { Section } from "@/app/services/articleService";

type Props = {
  section: Section
  points: number
  className?: string
}
export default function SectionProgressCard(props: Props) {

  function possibleSectionPoints(section: Section): number {
    let sum = 0;
    for (let id in section.points) {
      sum += section.points[id]
    }
    return sum;
  }

  return <main className={`rounded bg-slate-800 p-4 flex flex-col ${props.className || ""}`}>
    <h1 className="font-bold text-lg"> {props.section.title} </h1>

    <p className="mt-auto text-sm font-mono text-slate-500"> Earned {Math.round(props.points)}/{possibleSectionPoints(props.section)}pts ({Math.round(props.points * 100 / possibleSectionPoints(props.section))}%)</p>
    <div className="w-full bg-slate-700 rounded-full mt-2 h-2 overflow-hidden">
      <div style={{ width: `${Math.round(props.points * 100 / possibleSectionPoints(props.section))}%` }} className={`h-full bg-emerald-400`}> </div>
    </div>
  </main >
}
