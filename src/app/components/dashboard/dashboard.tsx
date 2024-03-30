"use client"
import { Profile } from "@/app/services/userService"
import SectionProgressCard from "../section-progress-card/sectionProgressCard"
import { useEffect, useState } from "react";
import { Section, getSections } from "@/app/services/articleService";

type Props = {
  profile: Profile
}

export default function ProfileDashboard(props: Props) {
  let [sections, setSections] = useState<Section[]>([]);
  let [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getSections().then((sections) => {
      setSections(sections)
      console.log(sections)
    }).catch(err => {
      setError(false)
    })
  }, [])

  return <main className="w-full h-full flex flex-col gap-4">
    <div className="flex flex-row flex-wrap w-full items-stretch gap-4">
      {sections.map(section =>
        <SectionProgressCard className="flex-1 min-w-48 h-48" key={section.id} section={section} points={props.profile.scores[section.id]} />
      )}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 gap-4">
      <div className="rounded p-2 bg-slate-800"> </div>
      <div className="rounded p-2 bg-slate-800"> </div>
    </div>
  </main>
}
