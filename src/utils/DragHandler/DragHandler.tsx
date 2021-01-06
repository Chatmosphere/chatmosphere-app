import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export interface DragProps {
  initPos:Point
  children:any
  currentScale:number
  pan:Point
}

interface Point {
  x:number,
  y:number
}

interface IDragElement {
  // readonly pos:Point
  ref: any
}

// const DragElement = styled.div.attrs(({pos}:IDragElement) => ({
//   left: `${pos.x}px`,
//   top: `${pos.y}px`,
// }))<IDragElement>`
//   background-color: gray;
//   position: absolute;
//   width: 200px;
// `
const DragElement = styled.div`
  background-color: gray;
  position: absolute;
  width: 200px;
`


const DragHandler = ({initPos, children, currentScale = 1, pan}:DragProps) => {
  pan = pan || {x:0,y:0}
  const [active, setActive] = useState(false)
  const pos = useRef(initPos)
  const clickDelta:any = useRef()
  const element:any = useRef()

  const onDrag = (e) => {
    if(element.current !== undefined) {
      const scale = currentScale
      const xPos = e.clientX - element.current.parentElement.getBoundingClientRect().left
      const yPos = e.clientY - element.current.parentElement.getBoundingClientRect().top
      element?.current?.setAttribute('style', `left:${xPos}px; top:${yPos}px`)
      console.log("pos", element.current.parentElement.getBoundingClientRect().top)
    }
  }

  const onUp = () => {
    setActive(false)
    document.removeEventListener("pointerup", onUp)
    document.removeEventListener("pointermove", onDrag)
  }

  const onDown = (e) => {
    e.preventDefault()
    setActive(true)
    const boundingRect = e.currentTarget.getBoundingClientRect()
    const scale = currentScale //boundingRect.width/userWidth
    clickDelta.current = {
      x: (e.clientX - boundingRect.x + pan.x) / scale,
      y: (e.clientY - boundingRect.y + pan.y) / scale,
    }
    document.addEventListener("pointerup", onUp)
    document.addEventListener("pointermove", onDrag)
  }

  // useEffect(() => {
  //   if(element.current) {
  //     element?.current?.setAttribute('style', `left:${pos.x}px; top:${pos.y}px`)
  //   }
  // })
  

  return (
    <DragElement ref={element} onPointerDown={onDown} id="DragElement">
      {children}
    </DragElement>
  )
}

export default DragHandler