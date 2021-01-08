import React from "react"
import { useConnectionStore } from "../../../Store/ConnectionStore"
import { Info } from "./Info"

export const ErrorHandler = () => {
  const { error: connectionError } = useConnectionStore()
  const error = connectionError
  return <>{error && <Info>{error}</Info>}</>
}
