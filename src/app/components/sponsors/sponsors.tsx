import { JetBrains_Mono } from 'next/font/google'

export default function Sponsors() {
  return <div className='flex flex-col md:flex-row bg-gray-900 p-4 pt-16 md:p-8 md:pt-10 gap-9 md:gap-9 items-top'>
    <div className='grow'>
      <h1 className="font-mono text-gray-300 text-5xl">Sponsors</h1>
    </div>
    <div className='w-full md:w-2/3 flex flex-col gap-2'>
      <div className="flex flex-col border-2 border-gray-600">
        <div className="p-2 bg-gray-600 text-slate-200">
          <h1 className="font-mono text-lg">Silver</h1>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center p-4 bg-gray-600/3 gap-8">
          <a href="https://www.interviewcake.com/" target='_blank'>
            <img src="/sponsors/interview-cake.svg" className='h-24' alt="Interview Cake Logo" />
          </a>
          <a href="https://www.janestreet.com/" target='_blank'>
            <img src="sponsors/jane-street.png" className='h-24' alt="Jane Street Logo" />
          </a>
        </div>
      </div>

      <div className="flex flex-col border-2 border-amber-700">
        <div className="p-2 bg-amber-700 text-slate-200">
          <h1 className="font-mono text-lg">Bronze</h1>
        </div>
        <div className="flex flex-row flex-wrap justify-center p-4 items-center bg-amber-700/30 gap-8">
          <a href="https://artofproblemsolving.com/" target='_blank' className='bg-slate-200 p-1 rounded'>
            <img src="/sponsors/aops.png" className='h-24' alt="AOPS Logo" />
          </a>

          <a href="https://1password.com/" target='_blank' className='p-1 rounded'>
            <img src="/sponsors/1password.svg" className='h-24' alt="1Password Logo" />
          </a>

          <a href="https://www.smythjewelers.com/" target='_blank' className='p-1 rounded'>
            <img src="/sponsors/smyth.webp" className='h-24' alt="Smyth Jewelers Logo" />
          </a>
        </div>
      </div>
    </div>
  </div>
}