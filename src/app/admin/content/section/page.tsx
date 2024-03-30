"use client"
import SectionEditor from "@/app/components/admin/sectionEditor"
import { useProfile } from "@/app/components/auth-provider/authProvider"
import { Section, createSection, getSection } from "@/app/services/articleService"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function AdminSectionEditPage() {
    const placeHolderID = "[REPLACE WITH THE ID YOU WANT]";
    const defualtSection: Section = {
        points: {},
        id: placeHolderID,
        title: "Untitled Section",
        index: 0,
        articles: [],
        description: "Description goes here..."
    }

    let profile = useProfile()
    const router = useRouter()
    const params = useSearchParams()
    let [section, setSection] = useState<Section>(defualtSection)
    let [editing, setEditing] = useState(false);

    useEffect(() => {
        if (params.get("id")) {
            setEditing(true)
            console.log(section)
            if (section.id == placeHolderID) {
                getSection(params.get("id")).then(section => {
                    setSection(section)
                    //console.log(section)
                }).catch(err => {
                    alert("An error occured, see the console!")
                    console.log(err)
                })
            }
        } else {
            //New
            setEditing(false)
        }
    }, [section, params])

    function handleSave(section: Section) {
        createSection(section).then(() => {
            alert("Section successfully updated/created!")
            router.back()
        }).catch(err => {
            alert("An error occured, see the console!")
            console.log(err)
        })
    }

    function handleCancel() {
        router.back()
    }

    return <main>
        {(profile && profile.admin) ?
            <div className="w-full h-auto flex justify-center">
                <div className="max-w-3xl w-full h-full p-4 flex flex-col gap-2">
                    <SectionEditor section={section} editing={editing} onSave={handleSave} onCancel={handleCancel}></SectionEditor>
                </div>
            </div> : <p className="p-2">You don&apos;t have admin permissions. If you think this is a mistake, contact us.</p>}
    </main>
}
