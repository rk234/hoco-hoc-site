"use client"

import { Section } from "@/app/services/articleService"
import { useEffect, useState } from "react"

type Props = {
    section: Section
    editing: boolean
    onSave: (section: Section) => void
    onCancel: () => void
}

export default function SectionEditor(props: Props) {
    let [section, setSection] = useState<Section>(props.section)

    useEffect(() => {
        setSection(props.section)
    }, [props.section])
    
    return <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{props.editing ? "Edit Section" : "Create Section"}</h1>
        {!props.editing ? <div>
            <label>Section ID: </label>
            <input type="text" placeholder="ID" value={section.id} onChange={(e) => setSection({...section, id: e.target.value})}></input>
        </div>: ""}
        <p>Section Title</p>
        <input type="text" placeholder="Title" value={section.title} onChange={(e) => setSection({...section, title: e.target.value})}></input>
        <p>Description</p>
        <textarea value={section.description} onChange={e => setSection({...section, description: e.target.value})}></textarea>
        <p>Index</p>
        <input type="number" value={section.index} onChange={e => setSection({...section, index: parseInt(e.target.value)})}></input>
        <div className="flex flex-row gap-1">
            <button className="btn-primary font-mono flex-1" onClick={() => props.onSave(section)}> {props.editing ? "Save" : "Create"} </button>
            <button className="btn-secondary font-mono" onClick={props.onCancel}> Cancel </button>
        </div>
    </div>
}