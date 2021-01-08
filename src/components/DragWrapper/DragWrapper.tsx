import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDrag } from '../../utils/hooks/useDrag'


const Element = styled.div`
  position:absolute;
`


export const DragWrapper = ({children}) => {

  const ref:any = useRef()
  const {onDown, position} = useDrag()

  useEffect(() => {
    ref?.current?.setAttribute('style', `left:${position.x}px; top:${position.y}px`)
  },[position])

  return (
    <Element onMouseDown={onDown} ref={ref} id="dragWrapper">
      {children}
    </Element>
  )
}

