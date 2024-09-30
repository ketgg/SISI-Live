"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import Model from "@/components/sisi"
import Loading from "@/components/loading"

const Scene = ({ currentWord, onAnimationFinish }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Canvas
        className="relative bg-background"
        camera={{ position: [0, 0.5, 1.5], fov: 60 }}
      >
        {/* <gridHelper />
      <axesHelper /> */}
        <OrbitControls />
        {/* <Environment preset="warehouse" /> */}
        <ambientLight />
        <directionalLight position={[-2.5, 2.5, 2.5]} intensity={1.5} />
        <Model
          position={[0, -1, 0]}
          rotation={[0, 0.055, 0]}
          currentWord={currentWord}
          onAnimationFinish={onAnimationFinish}
        />
      </Canvas>
    </Suspense>
  )
}

export default Scene
