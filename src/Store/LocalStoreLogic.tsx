import React from "react"
import { useEffect } from "react"
import { useConferenceStore } from "./ConferenceStore"
import { useConnectionStore } from "./ConnectionStore"
import { useLocalStore } from "./LocalStore"
import { throttle } from "lodash"


const sendPositionToPeers = (pos, conferenceObject) => {
  conferenceObject?.sendCommand("pos", { value: pos })
}
//throttle mustnt be rerendered or it wont work
const throttledSendPos = throttle(sendPositionToPeers, 200)

///LocalStore has dependency on ConferenceStore.
///This component provides the communication from ConferenceStore to LocalStore.
export const LocalStoreLogic = () => {
  const conference = useConferenceStore((state) => state.conferenceObject)
  const calculateVolumes = useConferenceStore((store) => store.calculateVolumes)
  const { setMyID, setLocalTracks, pos, id: myId } = useLocalStore()
  const jsMeet = useConnectionStore((store) => store.jsMeet)
  // const pos = useLocalStore((store) => store.pos)

  useEffect(() => {
    if (conference?.myUserId()) setMyID(conference.myUserId())

    //initialize the intial position of this user for other users
    if(conference) throttledSendPos(pos, conference)
  },[conference])
  
  useEffect(() => {
    if (jsMeet) {
      const createPromise = jsMeet.createLocalTracks(
        { devices: ["audio", "video"] },
        true,
      )
      createPromise
        .then((tracks) => {
          console.log("createPromise:", tracks)
          const permissionPromise = jsMeet.mediaDevices.isDevicePermissionGranted()
          permissionPromise.then((granted) => {
            console.log("permissionPromise:", granted)
          })
          setLocalTracks(tracks)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [jsMeet, setLocalTracks])

  function sendPositionToPeers(pos) {
    conference?.sendCommand("pos", { value: pos })
  }

  const throttledSendPos = throttle(sendPositionToPeers, 200)

  useEffect(() => {
    if (myId) {
      const newPos = JSON.stringify({ ...pos, id: myId })
      throttledSendPos(newPos)
      calculateVolumes(pos)
    }
  }, [pos, myId])

  return <></>
}
