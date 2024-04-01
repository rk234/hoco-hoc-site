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
        <div className="max-w-full flex flex-wrap justify-center">
            <div className= "bg-gray-900 p-4 rounded-md flex items-center sm:items-stretch w-72 md:w-80 lg:w-96 border border-sky-800 drop-shadow-2xl justify-center mx-4 my-4">
                <div >
                    <img className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded-md" src={member.image} alt={member.name} />
                </div>
                <div className="ml-4 flex flex-col justify-center flex-grow">
                    <div className="text-base md:text-lg lg:text-lg font-semibold text-white mb-2 whitespace-normal">{member.name}</div>
                    <div className="text-base md:text-[0.8rem] lg:text-base text-slate-400 whitespace-normal">{member.position}</div>
                </div>
            </div>
        </div>
    );
}
