export default function Sponsors() {
  return <div className='flex flex-col w-full justify-center md:flex-row bg-gray-900 px-4 md:px-8 py-28 gap-9 md:gap-9 items-center '>
    <div className="max-w-screen-xl gap-16 flex flex-col w-full">
      <h1 className="text-4xl md:text-5xl font-bold"> Howard County Hour of Code is made possible by:</h1>

      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl text-amber-500">Bronze</h1>
        <div className="flex flex-row flex-wrap justify-start items-center gap-4">
          <a href="https://scriptkiddo.com" target='_blank'>
            <img src="/sponsors/script_kiddo.png" className='h-24 md:h-32 bg-slate-200 rounded-lg p-2' alt="Script Kiddo" />
          </a>
          <a href="https://artofproblemsolving.com/" target='_blank'>
            <img src="/sponsors/aops.png" className='h-24 md:h-32 bg-slate-200 rounded-lg p-2' alt="Art of Problem Solving" />
          </a>
          <a href="https://www.wolframalpha.com/" target='_blank'>
            <img src="/sponsors/wolfram-alpha.png" className='h-24 md:h-32 bg-slate-200 rounded-lg p-2' alt="Wolfram Alpha" />
          </a>
          <a href="https://vercel.com/" target='_blank'>
            <img src="/sponsors/vercel.svg" className='h-24 md:h-32 bg-slate-200 rounded-lg p-2' alt="Vercel" />
          </a>
        </div>
      </div>
    </div>
  </div>
}
