"use client"

import React from "react"
import Intro from "@/components/intro"

const Display = ({ currentWordIndex, processedList }) => {
  // console.log(processedList)
  return (
    <div>
      {processedList.length === 0 ? (
        <Intro />
      ) : (
        <p>
          {processedList.map((lemma, index) => {
            let bgColor = ""
            if (
              lemma.posTags.includes("Noun") ||
              lemma.posTags.includes("Pronoun")
            ) {
              bgColor = "bg-lime-green"
            } else if (lemma.posTags.includes("Adjective")) {
              bgColor = "bg-lilac"
            } else if (lemma.posTags.includes("Verb")) {
              bgColor = "bg-orange"
            } else if (lemma.posTags.includes("Value")) {
              bgColor = "bg-pink"
            } else {
              bgColor = "bg-foreground"
            }

            return (
              <span
                key={index}
                className={`inline-block text-center font-normal text-lg leading-5 py-0.5 px-2 rounded-full min-w-9 ${
                  currentWordIndex === index ? `${bgColor} text-background` : ""
                }`}
              >
                {lemma.word}
              </span>
            )
          })}
        </p>
      )}
    </div>
  )
}

export default Display
