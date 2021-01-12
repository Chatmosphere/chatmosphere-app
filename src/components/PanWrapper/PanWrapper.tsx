import React from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useLocalStore } from "../../Store/LocalStore"
import { transformWrapperOptions} from './panOptions'

export const PanWrapper = ({children}) => {

  const onPanChange = useLocalStore(store => store.onPanChange)
  //@Caution there is a difference between the line above and the following line:
  //const {onPanChange} = useLocalStore()
  //The later one will rerender the conponent on any state chage,
  console.log("PanWrapper:",transformWrapperOptions)

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