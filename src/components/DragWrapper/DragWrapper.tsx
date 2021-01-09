import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDrag } from '../../utils/hooks/useDrag'


const Element = styled.div`
  position:absolute;
`


export const DragWrapper = ({children, initPos={x:0,y:0}, scale=1, callback=(pos):any=>null}) => {

  const ref:any = useRef()
  const {onDown, position} = useDrag({initPos, scale ,callback})

  useEffect(() => {
    ref?.current?.setAttribute('style', `left:${position.x}px; top:${position.y}px`)
  },[position, scale])

  return (
    <Element onPointerDown={onDown} ref={ref} id="dragWrapper">
      {children}
    </Element>
  )
}

