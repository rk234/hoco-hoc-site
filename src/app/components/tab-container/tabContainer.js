"use client"

import { useState } from "react";

export default function TabContainer(props) {
    let [idx, setIdx] = useState(0);

    return <div>
        {props.langs.map((lang, i) => (
            <button className={`${(i==idx) ? "btn-primary" : "btn-secondary"} p-1 mr-2 text-xs`} key={i} onClick={() => setIdx(i)}>{lang.toUpperCase()}</button>
        ))}
        <div className="m-0">
            {props.components[idx]}
        </div>
    </div>
}