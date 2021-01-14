import React, { useCallback, useEffect } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useLocalStore } from "./../../store/LocalStore"
import { panOptions, transformWrapperOptions} from './panOptions'

const panChange = store => store.onPanChange
const setPos = store => store.setLocalPosition

export const PanWrapper = ({children}) => {

  const onPanChange = useLocalStore(panChange)
  const setLocalPosition = useLocalStore(setPos)
  
  useEffect(() => {
    onPanChange({scale:transformWrapperOptions.scale,positionX:transformWrapperOptions.defaultPositionX,positionY:transformWrapperOptions.defaultPositionY})
    setLocalPosition(panOptions.user.initialPosition)
  },[])

  return (
    <TransformWrapper 
      {...transformWrapperOptions}
      onZoomChange={onPanChange}
      onPanning={onPanChange}
      onPinchingStop={onPanChange}
    >
      <TransformComponent>
        {children}
      </TransformComponent>
    </TransformWrapper>
  )
}