"use client"

import { useSearchParams } from "next/navigation"

export default function Read() {
    const params = useSearchParams()
    
    return <main>
        {params.get("article")}
    </main>
}