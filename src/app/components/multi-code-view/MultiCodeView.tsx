"use client"

import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
    className?: string
    langs: string[]
    codeSamples: string[]
    output?: string
    selected?: string
}

export default function MultiCodeView(props: Props) {
    let [idx, setIdx] = useState(props.selected ? findIndex() : 0);

    function findIndex() {
        const i = props.langs.indexOf(props.selected)
        return i == -1 ? 0 : i;
    }
    return <div className={`${props.className}`}>
        {props.langs.map((lang, i) => (
            <button className={`${(i == idx) ? "btn-primary" : "btn-secondary"} p-1 mr-2 text-xs`} key={i} onClick={() => setIdx(i)}>{lang.toUpperCase()}</button>
        ))}
        <div className="m-0">
            <SyntaxHighlighter
                PreTag="div"
                language={props.langs[idx]}
                style={{ ...theme }}
                codeTagProps={{ className: "font-mono" }}
                showLineNumbers={true}
                showInlineLineNumbers={true}
                wrapLongLines={false}
            >
                {(idx < props.codeSamples.length) && props.codeSamples[idx].trim()}
            </SyntaxHighlighter>
        </div>
        {props.output && <div>
            <p className="m-0 text-slate-300 p-2 rounded bg-[#282a36] uppercase italic font-bold text-sm">Output:</p>
            <SyntaxHighlighter
                PreTag="div"
                language={"text"}
                style={{ ...theme }}
                codeTagProps={{ className: "font-mono" }}
                showLineNumbers={true}
                showInlineLineNumbers={true}
                wrapLongLines={false}
            >
                {props.output.trim()}
            </SyntaxHighlighter>
        </div>}
    </div>
}
