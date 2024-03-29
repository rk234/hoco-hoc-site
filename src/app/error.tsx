"use client"
import { useEffect } from "react";
import ModalContainer from "./components/modal/modalContainer";
import Modal from "./components/modal/modal";

export default function CustomError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  useEffect(() => {
    console.log("An error occurred!");
    console.log(error)
  }, [error])

  return <main>
    <ModalContainer>
      <Modal className="flex flex-col">
        <p className="font-mono font-bold mb-2 text-lg">:(</p>
        <h1 className={`font-mono text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
        <p className="mb-4">Sorry, an uncaught error occurred somewhere. This is not supposed to happen. Contact us if the problem persists.</p>
        <p className="font-mono text-slate-400"> Error Details: {error.name} - {error.message} </p>
      </Modal>
    </ModalContainer>
  </main>
}
