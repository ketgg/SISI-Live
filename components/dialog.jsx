"use client"

import React from "react"

const Dialog = ({ dialogRef }) => {
  const closeDialog = () => {
    dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/25 focus:outline-none focus:ring-0 rounded-3xl bg-background text-foreground border border-border w-[90vw] max-w-[440px] px-4 py-4"
    >
      <div className="flex flex-col gap-2 item-center justify-center">
        <div className="text-center w-full h-full text-sm md:text-base font-thin">
          Speech Recognition is <span className="font-bold">not</span> supported
          in this browser. Please use a different browser for this functionality
          :)
        </div>
        <button
          onClick={closeDialog}
          className="self-center bg-foreground disabled:bg-foreground/60 disabled:cursor-not-allowed text-background text-sm md:text-base py-2 px-5 max-w-[160px] rounded-full hover:bg-foreground/60 transition-colors mx-2"
        >
          Got it, Thanks!
        </button>
      </div>
    </dialog>
  )
}

export default Dialog
