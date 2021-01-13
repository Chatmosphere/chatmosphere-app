import React from 'react'
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

  const conference = useConferenceStore(state => state.conferenceObject)
  const calculateVolumes = useConferenceStore((store) => store.calculateVolumes)
  const { setMyID, setLocalTracks, pos,  id : myId } = useLocalStore()
  const {initJitsiMeet,jsMeet} = useConnectionStore()
  // const pos = useLocalStore((store) => store.pos)


  useEffect(() => {
    initJitsiMeet()
  }, [initJitsiMeet])
  
  useEffect(()=>{
    if(conference?.myUserId()) setMyID(conference.myUserId())
    
    //initialize the intial position of this user for other users
    if(conference) throttledSendPos(pos, conference)
  },[conference])
  
  useEffect(() => {
      jsMeet
        ?.createLocalTracks({ devices: [ 'audio', 'video' ] }, true)
        .then(tracks => {setLocalTracks(tracks)})
        .catch(error => {
          console.log(error)
        });
  },[ jsMeet, setLocalTracks ])

  useEffect(()=>{
    if(myId) {
      const newPos = JSON.stringify({...pos, id: myId})
      throttledSendPos(newPos)
      calculateVolumes(pos)
    }
  },[pos, myId])
  
  return <></>
}