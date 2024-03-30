"use client"

import { useState } from "react";

export default function HelpPage() {
  let [statusMessage, setStatusMessage] = useState<string>("Something broke!");
  return <div className="w-full h-full">
    <main className="w-full h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-2">Help</h1>
      <hr className="border border-slate-600 mb-4" />
      <p className="text-lg mb-4">
        Encouter issues or have questions? Contact us on <a href="https://discord.com" target="_blank" className="font-bold underline">Discord</a> or at <a className="font-bold underline" href="mailto:mdhocohoc@gmail.com"> mdhocohoc@gmail.com </a>.
      </p>
      {statusMessage && statusMessage.length > 0 ?
        <div className="p-2 bg-amber-400/50 rounded border border-amber-400">
          <h1 className="font-bold text-lg mb-2 uppercase font-mono">Current Status Message</h1>
          <p> {statusMessage} </p>
        </div>
        : <p className="p-2 bg-sky-300/50 rounded border border-sky-300 font-bold">:) No active status messages at this time! </p>
      }
    </main>
  </div>
}
