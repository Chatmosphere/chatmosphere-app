import { useRef, useState } from "react"

export const useDrag = () => {
  const [dragInfo, setDragInfo] = useState({
    isActive: false,
    pos: { x: 0, y: 0 },
  })
  const oldPos = useRef({ x: 0, y: 0 })
  const clickPos = useRef({ x: 0, y: 0 })

  const onDrag = (e) => {
    const delta = {
      x: e.clientX - clickPos.current.x,
      y: e.clientY - clickPos.current.y,
    }
    setDragInfo({
      ...dragInfo,
      pos: {
        x: oldPos.current.x + delta.x,
        y: oldPos.current.y + delta.y,
      },
    })
  }

  const onUp = (e) => {
    // setDragInfo({
    //   ...dragInfo,
    //   isActive: false,
    //   pos: {
    //     x: e.clientX - clickDelta.current.x,
    //     y: e.clientY - clickDelta.current.y,
    //   },
    // })
    document.removeEventListener("pointerup", onUp)
    document.removeEventListener("pointermove", onDrag)
  }

  const onDown = (e) => {
    e.preventDefault()
    oldPos.current = {
      x: e.target.parentElement.offsetLeft,
      y: e.target.parentElement.offsetTop,
    }
    clickPos.current = {
      x: e.clientX,
      y: e.clientY,
    }
    setDragInfo({
      ...dragInfo,
      isActive: true,
    })
    document.addEventListener("pointerup", onUp)
    document.addEventListener("pointermove", onDrag)
  }

  const position = {
    x: dragInfo.pos.x,
    y: dragInfo.pos.y,
  }

  return { onDown, onDrag, onUp, position }
}
