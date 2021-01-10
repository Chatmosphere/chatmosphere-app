import React from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useLocalStore } from "./../../store/LocalStore"
import { transformWrapperOptions} from './panOptions'

export const PanWrapper = ({children}) => {

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