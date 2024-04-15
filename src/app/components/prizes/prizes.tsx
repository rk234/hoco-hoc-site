import React from 'react';

export default function Prizes() {
    return (
        <div>
            <div className="flex flex-col items-center bg-gradient-to-br from-black via-80% via-indigo-950 to-indigo-950 md:py-32 py-20">
                <div className="flex flex-col max-w-screen-xl items-start w-full">
                    <div className="w-full gap-12 flex flex-col max-w-3xl">
                        <div className="flex-1">
                            <h1 className="font-mono leading-tight text-5xl md:text-6xl pb-4 bg-gradient-to-r from-indigo-300 to-indigo-400 text-transparent bg-clip-text font-bold"> Prizes </h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col max-w-screen-xl items-start w-full">
                    <div className="w-full gap-12 flex flex-row ">
                        <div className="flex-1 pt-8">
                            <h2 className="text-white text-3xl text-center bg-sky-900 rounded-t-lg p-4">Individual Prizes</h2>
                            <ul className="rounded-b-xl bg-sky-800 p-4 pl-8 list-disc">
                                <li>2x Razer Gaming keyboards ($180)</li>
                                <li>12x Best Buy gift cards ($25)</li>
                                <li>4x Art of Problem Solving gift cards ($25)</li>
                            </ul>
                        </div>
                        <div className="flex-1 p-8">
                            <h2 className="text-white text-3xl text-center bg-sky-900 rounded-t-lg p-4">School Prizes</h2>
                            <ul className="rounded-b-xl bg-sky-800 p-4 pl-8 list-disc">
                                <li>2x Razer Gaming keyboards ($180)</li>
                                <li>12x Best Buy gift cards ($25)</li>
                                <br/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
