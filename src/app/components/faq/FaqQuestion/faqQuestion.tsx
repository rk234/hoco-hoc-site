
import React, { useState } from 'react';


export default function FaqQuestion(props: { question: string; answer: string; }) {
    let [expanded, setExpanded] = useState(false);

    function toggle() {
        setExpanded(!expanded);
    }

    return (
        <div className="border-2 border-slate-700 rounded-md mb-4 overflow-hidden">
            <button className="w-full bg-slate-800 text-white px-3 py-3 md:px-4 md:py-2 font-sans text-base md:text-lg border-b border-slate-700 cursor-pointer hover:opacity-80" onClick={toggle}>{props.question}</button>
            <div className={`${expanded ? 'block' : 'hidden'} transition-all duration-500 ease-in-out overflow-hidden`}>
                <p className="p-4 md:p-6">{props.answer}</p>
            </div>
        </div>
    );
}

