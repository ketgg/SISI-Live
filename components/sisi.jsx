/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/sisi.glb -o components/sisi.jsx -r public 
*/

import React, { useDebugValue, useEffect } from "react"
import * as THREE from "three"
import { useGraph } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import { SkeletonUtils } from "three-stdlib"
import { useAnimationContext } from "@/components/animations"

const Model = ({ position, rotation, currentWord, onAnimationFinish }) => {
  const group = React.useRef()
  const { scene, animations } = useGLTF("/models/sisi.glb")
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions, names, mixer } = useAnimations(animations, group)
  const { setAnimationsList } = useAnimationContext()

  useEffect(() => {
    setAnimationsList(names)
  }, [names])

  useEffect(() => {
    const idleAction = actions["0_Idle"]

    if (currentWord && actions && actions[currentWord.animName]) {
      idleAction.reset().stop()

      const action = actions[currentWord.animName]
      action.setLoop(THREE.LoopOnce)
      action.reset().play()
      action.clampWhenFinished = true

      const playNext = (e) => {
        if (e.action._clip.name === currentWord.animName) {
          mixer.stopAllAction()
          idleAction.reset().play()
          onAnimationFinish()
        }
      }
      mixer.addEventListener("finished", playNext)

      return () => {
        mixer.removeEventListener("finished", playNext)
        action.stop() // Cleanup on word change
      }
    } else {
      idleAction.reset().play()

      return () => {
        idleAction.stop()
      }
    }
  }, [currentWord])

  return (
    <group ref={group} position={position} rotation={rotation} dispose={null}>
      <group name="Scene">
        <group name="Aisha">
          <group name="Feet" />
          <group name="Hair" />
          <group name="Hands" />
          <group name="Legs" />
          <group name="Rig" rotation={[-Math.PI / 2, 0, 0]}>
            <primitive object={nodes.Pelvis} />
            <skinnedMesh
              name="Aisha_Feet_All-Star"
              geometry={nodes["Aisha_Feet_All-Star"].geometry}
              material={materials.Aisha_Torso_CutSweatshirt}
              skeleton={nodes["Aisha_Feet_All-Star"].skeleton}
            />
            <skinnedMesh
              name="Aisha_Hair_CommonHair"
              geometry={nodes.Aisha_Hair_CommonHair.geometry}
              material={materials.Aisha_Palette_2}
              skeleton={nodes.Aisha_Hair_CommonHair.skeleton}
            />
            <skinnedMesh
              name="Aisha_Hand_Glove"
              geometry={nodes.Aisha_Hand_Glove.geometry}
              material={materials.Aisha_Torso_CutSweatshirt}
              skeleton={nodes.Aisha_Hand_Glove.skeleton}
            />
            <skinnedMesh
              name="Aisha_Legs_Pants"
              geometry={nodes.Aisha_Legs_Pants.geometry}
              material={materials["Aisha_Torso_Skull Sweatshirt"]}
              skeleton={nodes.Aisha_Legs_Pants.skeleton}
            />
            <skinnedMesh
              name="Aisha_Torso_T-Shirt"
              geometry={nodes["Aisha_Torso_T-Shirt"].geometry}
              material={materials.Aisha_MainPalette}
              skeleton={nodes["Aisha_Torso_T-Shirt"].skeleton}
            />
          </group>
          <group name="Torso" />
        </group>
      </group>
    </group>
  )
}

export default Model

useGLTF.preload("/models/sisi.glb")