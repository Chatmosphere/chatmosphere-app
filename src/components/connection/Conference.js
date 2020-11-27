import React, { useEffect } from 'react';
import { User } from '../User/User';
import { conferenceOptions } from './options';
import { useStore} from '../Store/store'
import { useConnectionStore } from '../Store/ConnectionStore';
import { useUserStore } from '../Store/UserStore';

export const Conference = ({connection}) => {

  const [room, setRoom] = useConnectionStore(state => [state.room, state.setRoom])
  const {conferenceName} = useConnectionStore()

  //publicStore
  const { addUser, removeUser, addAudioTrack, addVideoTrack, updateUserPosition} = useUserStore()
  const JitsiMeetJS = useConnectionStore(state => state.jsMeet)
  
  useEffect(() => {
    console.log("CALLED HOW OFTEN ", JitsiMeetJS)
    if( JitsiMeetJS) {
      const r = connection.initJitsiConference(conferenceName, conferenceOptions)
      r.on(JitsiMeetJS.events.conference.TRACK_ADDED, on_remote_track_added)
      r.on(JitsiMeetJS.events.conference.TRACK_REMOVED, on_remote_track_removed)
      r.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, on_conference_joined)
      r.on(JitsiMeetJS.events.conference.USER_JOINED, on_user_joined)
      r.on(JitsiMeetJS.events.conference.USER_LEFT, on_user_left)
      // r.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, onTrackToggleMuted);
      // r.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, onUserNameChanged);
      r.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, on_remote_track_audio_level_changed);
      // r.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, onPhoneNumberChanged);
      // r.addCommandListener("pos", onPositionReceived)
      r.addCommandListener("pos", onPositionReceived)
      // r.on(JitsiMeetJS.events.conference.PARTICIPANT_PROPERTY_CHANGED, (e) => console.log("Property Changed ", e))
      r.join(); // FFFUUUUUUUUUUUUCK THATS IT GOD DAMNIT
      setRoom(r)
    }
    return(() => {
      room?.leave()
        // if(r) r?.leave()
    })
  },[connection, JitsiMeetJS])

  const onPositionReceived = (e) => {
    const pos = JSON.parse(e.value)
    updateUserPosition(pos.id, {x:pos.x, y:pos.y})
  }

  const on_remote_track_added = (track) => {
    if(track.isLocal()) return // also run on your own tracks so exit
    track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,() => console.log('remote track stopped'))
    track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,deviceId =>console.log(`track audio output device was changed to ${deviceId}`))
    const id = track.getParticipantId() // get user id of track
    track.getType() === "audio" ? addAudioTrack(id, track) : addVideoTrack(id, track)
  }

  const on_remote_track_removed = (track) => {
    
    track.dispose()
  }

  const on_conference_joined = () => {

  }
  const on_user_joined = (id) => {
    addUser(id)
  }

  const on_user_left = (id) => {
    console.log("USER LEFT !!!!!!!! ", id)
    removeUser(id)
  }
  const on_remote_track_audio_level_changed = () => {

  }

  return (
    null
  )
}
