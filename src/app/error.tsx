"use client"
import { useEffect } from "react";
import ModalContainer from "./components/modal/modalContainer";
import Modal from "./components/modal/modal";
import ErrorPopup from "./components/error-popup/errorPopup";

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
    <ErrorPopup error={error}>
      <p className="font-mono font-bold mb-2 text-lg">:(</p>
      <h1 className={`font-mono text-2xl font-bold text-red-400 mb-2`}>Something went wrong...</h1>
      <p className="mb-4">Sorry, an uncaught error occurred somewhere. This is not supposed to happen. Contact us if the problem persists.</p>
      <p className="font-mono text-slate-400"> Error Details: {error.name} - {error.message} </p>
    </ErrorPopup>
  </main>
}
