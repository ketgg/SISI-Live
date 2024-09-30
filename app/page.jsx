"use client"

import { useState } from "react"
import Scene from "@/components/scene"
import Form from "@/components/form"
import Display from "@/components/display"
import { useAnimationContext } from "@/components/animations"
import processText from "@/actions/process-text"

const Home = () => {
  const [processedList, setProcessedList] = useState([])
  const { animationsList } = useAnimationContext()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const findAnimation = (word) => {
    return animationsList.find((anim) => {
      const alternatives = anim.toLowerCase().split("|")
      return alternatives.includes(word.toLowerCase())
    })
  }

  const handleSubmit = async (formData) => {
    if (isPlaying) {
      setIsPlaying(false)
      setCurrentWordIndex(-1)
      return
    }

    setIsPlaying(true)
    setCurrentWordIndex(0)

    const text = formData.get("text")?.toString()
    const processedSentences = await processText(text)
    const flattenedList = processedSentences.flat() // { word: "", posTags: "" }

    let processedList = [] // { word: "", animName: "", posTags: [] }

    flattenedList.forEach((item) => {
      let wordAnimName = findAnimation(item.word)
      if (wordAnimName) {
        processedList.push({
          word: item.word,
          animName: wordAnimName,
          posTags: item.posTags,
        })
      } else {
        item.word.split("").forEach((char) => {
          if (char == "0") {
            processedList.push({
              word: char,
              animName: findAnimation("empty"),
              posTags: ["Value"],
            })
          } else {
            let animName = findAnimation(char)
            if (animName) {
              processedList.push({
                word: char,
                animName: animName,
                posTags: ["Character"],
              })
            }
          }
        })
      }
    })

    setProcessedList(processedList)
  }

  const totalWords = processedList.length
  const currentWord = processedList[currentWordIndex]
  // console.log(currentWord)

  const handleAnimationFinish = () => {
    setCurrentWordIndex((prevIndex) => {
      if (prevIndex + 1 < totalWords) {
        return prevIndex + 1
      } else {
        setIsPlaying(false)
        return -1 // Stop at the last word
      }
    })
  }

  return (
    <main className="pt-20 md:pt-24 lg:pt-32 pb-6 md:pb-16 px-[4%] min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-[36%_auto] md:py-4 gap-3 max-w-[1280px] min-h-[540px] md:min-h-[480px] mx-auto">
        <div className="min-h-72 sm:min-h-80 bg-transparent">
          <Scene
            currentWord={currentWord}
            onAnimationFinish={handleAnimationFinish}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center grow py-2 px-4">
            <Display
              currentWordIndex={currentWordIndex}
              processedList={processedList}
            />
          </div>
          <div className="flex flex-col justify-end py-3">
            <Form
              action={handleSubmit}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
