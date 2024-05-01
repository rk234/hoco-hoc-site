import TeamCard from './teamCard';
import React from 'react';

export default function TeamSection() {
    const teamMembers = [
        //directors
        { name: "Alex Luo", position: "Director", image: "./headshots/alex_headshot.png" },
        { name: "Aryan Sharma", position: "Director", image: "./headshots/aryan_headshot.jpg" },
        //web dev
        { name: "Ramy Kaddouri", position: "Web Dev Lead", image: "./headshots/ramy_headshot.jpeg" },
        { name: "Arif Vempalle", position: "Web Dev", image: "./headshots/arif_headshot.png" },
        { name: "Nicole Luo", position: "Web Dev", image: "./headshots/nicole_headshot.jpg" },
        //everyone else
        { name: "Jamie Lee", position: "Outreach", image: "./headshots/jamie_headshot.png" },
        { name: "Anjali Vallabhaneni", position: "Outreach\nSponsorships", image: "./headshots/anjali_headshot.png" },
        { name: "Sai Chandra", position: "Articles\nSponsorships", image: "./headshots/sai_headshot.png" },
        { name: "Seonyoung Lee", position: "Articles\nSponsorships", image: "./headshots/seonyoung_headshot.png" },
        { name: "Suhas Anumolu", position: "Articles\nSponsorships", image: "./headshots/suhas_headshot.png" },
        { name: "Thomas Li", position: "Sponsorships", image: "./headshots/thomas_headshot.png" },
        { name: "Yoan Fodjong", position: "Articles", image: "./headshots/yoan_headshot.png" },
    ];

    return (
        <div className="flex flex-col items-center p-4 md:p-8 py-20 md:py-32">
            <h3 className="font-mono text-sky-300 font-bold bg-gradient-to-b from-sky-300 to-sky-500 text-transparent bg-clip-text text-5xl md:text-6xl mb-10 text-center">Meet the Team</h3>
            <div className="flex w-full flex-col max-w-screen-xl items-center">
                <div className="gap-x-4 gap-y-4 grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr justify-center">
                    {teamMembers.map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );

}
