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
        <div>
            <h3 className="font-mono mt-16 ml-2 mr-2 md:ml-25 md:mr-25 text-sky-300 font-bold bg-gradient-to-b from-sky-300 to-sky-500 text-transparent bg-clip-text text-5xl md:text-6xl mb-8 text-center leading-tight">Meet the Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center px-4 mb-10">
            {teamMembers.map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>
        </div>
    );
}
