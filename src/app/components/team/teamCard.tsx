import React from 'react';

type TeamMember = {
    name: string;
    position: string;
    image: string;
};

type TeamProps = {
    member: TeamMember;
};

export default function TeamCard(props: TeamProps) {
    const { member } = props;

    return (
        <div className="w-full h-full">
            <div className="w-full h-full bg-gray-900 p-4 rounded-md flex items-center sm:items-stretch border border-gray-800 drop-shadow-2xl justify-center">
                <div>
                    <img className="w-20 h-20 object-cover rounded-full" src={member.image} alt={member.name} />
                </div>
                <div className="ml-4 flex flex-1 flex-col justify-center flex-grow">
                    <div className="text-base md:text-lg lg:text-lg font-semibold text-white mb-2 whitespace-normal">{member.name}</div>
                    <div className="text-base md:text-[0.8rem] lg:text-base text-slate-400 whitespace-normal">{member.position}</div>
                </div>
            </div>
        </div>
    );
}
