"use client"

import { ReactNode, useState } from "react";

type Props = {
    langs: string[],
    components: ReactNode[],
    selected?: string
}

export default function TabContainer(props: Props) {
    let [idx, setIdx] = useState(props.selected ? findIndex() : 0);

    function findIndex() {
        const i = props.langs.indexOf(props.selected)
        return i == -1 ? 0 : i;
    }

    return <div>
        {props.langs.map((lang, i) => (
            <button className={`${(i==idx) ? "btn-primary" : "btn-secondary"} p-1 mr-2 text-xs`} key={i} onClick={() => setIdx(i)}>{lang.toUpperCase()}</button>
        ))}
        <div className="m-0">
            {props.components[idx]}
        </div>
    </div>
}