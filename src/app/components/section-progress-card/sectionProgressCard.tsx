import { Section } from "@/app/services/articleService";

type Props = {
  section: Section
  points: number
  className?: string
}
export default function SectionProgressCard(props: Props) {

  function possibleSectionPoints(): number {
    let sum = 0;
    for (let id in props.section.points) {
      sum += props.section.points[id]
    }
    return sum;
  }

  function percentComplete(): number {
    return (possibleSectionPoints() == 0 || !props.points) ? 0 : Math.round(props.points * 100 / possibleSectionPoints())
  }

  return <main className={`rounded bg-slate-800 p-4 flex flex-col ${props.className || ""}`}>
    <h1 className="font-bold text-lg mb-2"> {props.section.title} </h1>
    <p className="text-sm text-slate-300"> {props.section.description} </p>
    <p className="mt-auto text-sm font-mono text-slate-500"> Earned {Math.round(props.points ?? 0)}/{possibleSectionPoints()}pts ({percentComplete()}%)</p>
    <div className="w-full bg-slate-700 rounded-full mt-2 h-2 overflow-hidden">
      <div style={{ width: `${percentComplete()}%` }} className={`h-full bg-emerald-400`}> </div>
    </div>
  </main >
}
