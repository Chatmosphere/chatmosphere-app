import React, { useEffect } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useLocalStore } from "../../Store/LocalStore"
import { panOptions, transformWrapperOptions} from './panOptions'

export const PanWrapper = ({children}) => {

  const onPanChange = useLocalStore(store => store.onPanChange)
  const setLocalPosition = useLocalStore(store => store.setLocalPosition)
  
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