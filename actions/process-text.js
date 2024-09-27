"use server"

import nlp from "compromise"
import stopWords from "@/lib/stopwords"

const processText = async (text) => {
  // Convert to lowercase
  text = text.toLowerCase()

  // Segmenting the text into sentences
  let doc = nlp(text)
  let sentences = doc.sentences().out("array")

  let processedSentences = []

  // Handle each sentence
  sentences.forEach((sentence) => {
    let sentenceDoc = nlp(sentence)
    let terms = sentenceDoc.terms().out("tags")

    let tenseCount = {
      past: 0,
      present: 0,
      presentContinuous: 0,
      future: 0,
    }
    let processedWords = []

    terms.forEach((term) => {
      const word = Object.keys(term)[0]
      const posTags = term[word]
      let processedWord = {
        word: word,
        posTags: posTags,
      }
      if (!stopWords.has(word)) {
        // Replace I by ME
        if (
          word === "i" &&
          (posTags.includes("Noun") || posTags.includes("Pronoun"))
        ) {
          processedWord.word = "me"
          processedWords.push(processedWord)
        } else {
          // Lemmatize each word
          let lemma = nlp(word).compute("root").text("root")
          processedWord.word = lemma.toLowerCase()
          processedWords.push(processedWord)
        }
      }

      // Check for verb tenses
      if (posTags.includes("PastTense")) tenseCount.past++
      if (posTags.includes("PresentTense")) tenseCount.present++
      if (posTags.includes("Gerund")) tenseCount.presentContinuous++
      if (posTags.includes("Modal")) tenseCount.future++
    })

    let probableTense = Object.keys(tenseCount).reduce((a, b) =>
      tenseCount[a] > tenseCount[b] ? a : b
    )

    if (probableTense === "past" && tenseCount["past"] > 0) {
      !processedWords.some((obj) => obj.word === "before") &&
        processedWords.unshift({
          word: "before",
          posTags: nlp("before").out("tags")[0].before,
        })
    } else if (probableTense === "future" && tenseCount["future"] > 0) {
      !processedWords.some((obj) => obj.word === "will") &&
        processedWords.unshift({
          word: "will",
          posTags: nlp("will").out("tags")[0].will,
        })
    } else if (
      (probableTense === "present" || probableTense === "presentContinuous") &&
      tenseCount["presentContinuous"] > 0
    ) {
      !processedWords.some((obj) => obj.word === "now") &&
        processedWords.unshift({
          word: "now",
          posTags: nlp("now").out("tags")[0].now,
        })
    }
    // console.log(tenseCount, probableTense)
    processedSentences.push(processedWords)
  })

  return processedSentences
}

export default processText
