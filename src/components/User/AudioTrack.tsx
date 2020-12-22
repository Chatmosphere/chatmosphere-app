import React, { useCallback, useEffect, useRef } from 'react';
import { useConferenceStore } from '../../Store/ConferenceStore';

export const AudioTrack = ({id, volume}) => {
  const audioTrack = useConferenceStore(useCallback(store => store.users[id]['audio'], [id]))
  const myRef:any = useRef()

  useEffect(() => {
    myRef.current.volume = volume
  },[volume])

  useEffect(() => {
    const currentElement = myRef.current
    audioTrack?.attach(currentElement)
    return(() => {
      audioTrack?.detach(currentElement)
      audioTrack?.dispose()
    })
  },[audioTrack])

  return (
    <audio autoPlay={true} ref={myRef} className={`remoteTrack audioTrack ${id}audio`} id={`${id}audio`} />
  )
}