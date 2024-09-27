"use client"

import { useState, createContext, useContext } from "react"

const AnimationContext = createContext()

const AnimationProvider = ({ children }) => {
  const [animationIndex, setAnimationIndex] = useState(0)
  const [animationsList, setAnimationsList] = useState([])

  return (
    <AnimationContext.Provider
      value={{
        animationIndex,
        setAnimationIndex,
        animationsList,
        setAnimationsList,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

const useAnimationContext = () => {
  return useContext(AnimationContext)
}

export { AnimationProvider, useAnimationContext }
