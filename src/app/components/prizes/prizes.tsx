import React from 'react';

export default function Prizes() {
    return (
        <div className="bg-gray-900 mt-3">
            <div id="title" className="font-mono text-center text-6xl text-transparent bg-gradient-to-r from-sky-300 to-indigo-400 bg-clip-text">
                Prizes
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-8">
                    <h2 className="text-white text-3xl text-center bg-sky-900 rounded-t-lg p-4">Individual Prizes</h2>
                    <ul className="rounded-b-xl bg-sky-800 p-4 pl-8 list-disc">
                        <li>2x Razer Gaming keyboards ($180)</li>
                        <li>12x Best Buy gift cards ($25)</li>
                        <li>4x Art of Problem Solving gift cards ($25)</li>
                    </ul>
                </div>
                <div className="flex-1 p-8">
                    <h2 className="text-white text-3xl text-center bg-sky-900 rounded-t-lg p-4">Winning School Prizes</h2>
                    <ul className="rounded-b-xl bg-sky-800 p-4 pl-8 list-disc">
                        <li>Website banner</li>
                        <li>$300 donation to computer science dept.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
