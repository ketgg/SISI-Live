"use client"

import React from "react"
import { useState, useRef } from "react"
import Dialog from "@/components/dialog"

const Form = ({ action, isPlaying, setIsPlaying }) => {
  const lang = "en-US"
  const [isRecordActive, setIsRecordActive] = useState(false)
  const dialogRef = useRef()
  const recognitionRef = useRef()

  const [text, setText] = useState("")
  const [isActive, setActive] = useState(false)
  const textAreaRef = useRef(null)

  const maxCharacters = 320
  const percentageTyped = Math.min((text.length / maxCharacters) * 100, 100)
  const radius = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashOffset =
    circumference - (percentageTyped / 100) * circumference

  const handleOnRecord = () => {
    if (isRecordActive) {
      recognitionRef.current?.stop()
      setIsRecordActive(false)
      return
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      dialogRef.current.showModal()
      return
    }

    if (text !== "") {
      setText("")
    }

    // const recognition = new SpeechRecognition()
    recognitionRef.current = new SpeechRecognition()

    recognitionRef.current.onstart = () => {
      setIsRecordActive(true)
    }
    recognitionRef.current.onend = () => {
      setIsRecordActive(false)
    }

    recognitionRef.current.onresult = async (e) => {
      const transcript = e.results[0][0].transcript
      setText(transcript)
    }

    recognitionRef.current.start()
  }

  const handleInput = (e) => {
    const textArea = textAreaRef.current
    if (textArea) {
      textArea.style.height = "auto" // Reset height to recalculate
      // console.log(textArea.style.height, textArea.scrollHeight)
      textArea.style.height = `${Math.min(textArea.scrollHeight, 144)}px` // Adjust the height to fit content
    }
    setText(e.target.value) // Update content state
  }

  return (
    <>
      <Dialog dialogRef={dialogRef} />
      <form className="flex flex-col gap-3" action={action}>
        <div
          className={`flex relative w-full border ${
            isActive ? "border-foreground" : "border-border"
          } rounded-[24px]`}
        >
          <textarea
            ref={textAreaRef}
            name="text"
            value={text}
            maxLength={maxCharacters}
            onChange={handleInput}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            className="bg-transparent text-foreground text-sm md:text-base w-full max-h-[144px] my-2 ml-4 focus:ring-0 focus:outline-none resize-none font-light placeholder:text-foreground/60 transition-colors"
            placeholder="Start typing here..."
            rows={1}
          ></textarea>
          {text !== "" && (
            <svg
              className="overflow-visible my-2 mx-2 self-end transition-all duration-200"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <circle
                cx="50%"
                cy="50%"
                r={10}
                fill="transparent"
                className="text-border"
                stroke="currentColor" /* Background white ring */
                strokeWidth={`${percentageTyped === 100 ? "2.5" : "1.75"}`}
              />
              <circle
                cx="50%"
                cy="50%"
                r={10}
                fill="transparent"
                className={`${
                  percentageTyped === 100 ? "text-red" : "text-foreground"
                }`} /* Use Tailwind extended custom color */
                stroke="currentColor" /* Foreground custom ring */
                strokeWidth={`${percentageTyped === 100 ? "2.5" : "1.75"}`}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashOffset}
                strokeLinecap="round"
                transform="rotate(-90 12 12)"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            disabled={isPlaying ? true : false}
            className={`${
              isRecordActive
                ? "bg-red hover:bg-red/80 border border-foreground"
                : "bg-background border border-foreground hover:bg-foreground hover:text-background disabled:border-foreground/60 disabled:text-foreground/60"
            } disabled:hover:bg-background disabled:cursor-not-allowed text-foreground text-sm md:text-base py-2 px-5 min-w-[120px] rounded-full transition-colors`}
            onClick={handleOnRecord}
            type="button"
          >
            {isRecordActive ? "Stop" : "Record"}
          </button>

          <button
            disabled={text.trim() === "" || isRecordActive ? true : false}
            className={`${
              isPlaying
                ? "bg-red disabled:bg-red/80 hover:bg-red/80 text-background"
                : "bg-foreground disabled:bg-foreground/60 hover:bg-foreground/60 text-background"
            } disabled:cursor-not-allowed text-sm md:text-base py-2 px-5 min-w-[120px] rounded-full transition-colors`}
            type="submit"
          >
            {isPlaying ? "Stop" : "Play"}
          </button>
        </div>
      </form>
    </>
  )
}

export default Form
