import * as React from "react"
import { useEffect } from "react"
import { Header } from "../../components/Header/Header"
import { Localuser } from "../../components/Localuser/Localuser"
import { useConnectionStore } from "../../Store/ConnectionStore"
import { LocalStoreLogic } from "../../Store/LocalStore"

export const Enter = () => {
  const { initJitsiMeet } = useConnectionStore()

  useEffect(() => {
    initJitsiMeet()
  }, [initJitsiMeet])

  return (
    <>
      <Header>Chatmosphere</Header>

      <LocalStoreLogic />
      <Localuser />
    </>
  )
}
