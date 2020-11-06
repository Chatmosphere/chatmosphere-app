import React, { useEffect, useState } from 'react';
import { User } from '../User';
import { conferenceName, conferenceOptions, jitsiInitOptions } from './options';
import {useStore} from './Connection'

export const Room = ({roomName, JitsiMeetJS, connection}) => {

  const [room, setRoom] = useState(undefined)
  const [users, setUsers] = useState({})
  const addUser = useStore(state => state.addUser)
  const deleteUser = useStore(state => state.deleteUser)

  useEffect(() => {
    if(connection && JitsiMeetJS) {
      console.log("ROOM Connection is ", connection)
      const r = connection.initJitsiConference(roomName, conferenceOptions)
      r.on(JitsiMeetJS.events.conference.TRACK_ADDED, on_remote_track_added)
      r.on(JitsiMeetJS.events.conference.TRACK_REMOVED, on_remote_track_removed)
      r.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, on_conference_joined)
      r.on(JitsiMeetJS.events.conference.USER_JOINED, on_user_joined)
      r.on(JitsiMeetJS.events.conference.USER_LEFT, on_user_left)
      // r.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, onTrackToggleMuted);
      // r.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, onUserNameChanged);
      r.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, on_remote_track_audio_level_changed);
      // r.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, onPhoneNumberChanged);
      r.addCommandListener("pos", on_position_received)
      r.join(); // FFFUUUUUUUUUUUUCK THATS IT GOD DAMNIT
      setRoom(r)
    }
    return((r) => {
        //if(room !== undefined) room.leave()
        console.log("ROOM LEAVE CALLED")
    })
  },[connection])

  const on_remote_track_added = (track) => {
    if(track.isLocal()) return // also run on your own tracks so exit
    const id = track.getParticipantId()
    const userTracks = {...users.id}
    track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, audioLevel => null)
    // track.getType() === 'video' ? 
    console.log(id)
  }
  const on_remote_track_removed = () => {

  }
  const on_conference_joined = () => {

  }
  const on_user_joined = (id) => {
    const tmpUsers = {...users, 
      [id]: {}
    }
    addUser(id)
    console.log("User joined ", tmpUsers)
    setUsers(tmpUsers)
  }
  const on_user_left = (id) => {
    const {[id]:value, ...tmpUsers} = users// thats a really neat trick, falling in ❤️ with code
    console.log("User left ", id)
    setUsers(tmpUsers)
  }
  const on_remote_track_audio_level_changed = () => {

  }
  const on_position_received = () => {

  } 

  return (
    <div>
      {Object.keys(users).map((id, index) => {
        return(
            <User id={id} tracks={users[id]}/>
        )
      })}
    </div>
  )
}
