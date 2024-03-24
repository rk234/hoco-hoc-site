
import React from 'react';
import FaqQuestion from './FaqQuestion/faqQuestion'

export default function Faq() {

    return (
        <div className="p-4 md:p-8 flex-col items-center text-center">
            <h3 className="font-mono mt-8 ml-25 mr-25 text-sky-300 font-bold bg-gradient-to-r from-sky-300 to-indigo-400 text-transparent bg-clip-text text-5xl md:text-6xl mb-8 text-center leading-tight">Frequently Asked Questions</h3>
            <div className="mb-10 font-sans w:32 text-sm md:text-lg max-w-screen-2xl mx-auto flex flex-col :text-4xl md:flex-row gap-0 md:gap-10 justify-center items-start">
                <div className="w-full md:w-1/2 flex flex-col">
                    <FaqQuestion
                        question={"When is the Hour of Code?"}
                        answer={`Date TBD`}
                    />
                    <FaqQuestion
                        question={"How do I participate in the Hour of Code?"}
                        answer={`Login using your HCPSS Google account, navigate to the Articles tab on this website, and start completing articles! Completing articles will earn you and your school points, which are transformed into raffle tickets at the end of the event.`}
                    />
                    <FaqQuestion
                        question={"What device should I use?"}
                        answer={`Please use a laptop or device with a large screen for the best user experience. Some pages will look funky on mobile...`}
                    />
                    <FaqQuestion
                        question={"How do the points/prizes work?"}
                        answer={`
                        Points are earned by completing articles! Stay tuned for more information about prizes. 
                    `}

                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    <FaqQuestion
                        question={"Why computer science?"}
                        answer={`Every student should have the opportunity to learn computer science. It helps nurture problem-solving skills, logic and creativity. By starting early, students will have a foundation for success in any 21st-century career path.`}
                    />
                    <FaqQuestion
                        question={"Why was this website made?"}
                        answer={`This website is the product of a collaboration between various schools and clubs across the county. It is intended to be a version of Hour of Code better catered for high schoolers and to better promote CS education through inter-school competitions.`}
                    />
                    <FaqQuestion
                        question={"How do I keep learning after Hour of Code?"}
                        answer={`Our teachers in Howard County are some of the best educators in the world- take advantage of the opportunities HCPSS offers! If you liked learning about CS, then consider taking some of our county’s CS courses. CS is also unique in that there is a wide array of online resources to help you learn virtually any topic you can imagine, from YouTube tutorials, to free courses, to online forums - make sure to take advantage of these!`}
                    />
                    <FaqQuestion
                        question={"I still have questions. Where can I ask them?"}
                        answer={`Please email any questions to mdhocohoc@gmail.com and we will get back to you as soon as possible.`}
                    />
                </div>
            </div>
        </div>
    )
}

