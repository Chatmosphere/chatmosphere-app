import React, { useRef } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useLocalStore } from "../../Store/LocalStore"
import { transformWrapperOptions} from './panOptions'

export const PanHandler = ({children}) => {

  const onPanChange = useLocalStore(store => store.onPanChange)

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