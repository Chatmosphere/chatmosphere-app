import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import createStateSetter from "../components/StateSetter";
import {
  conferenceOptions,
  connectionOptions,
  jitsiInitOptions,
} from "../components/connection/options";
import ConnectionStore from "./ConnectionStore";
import omit from "lodash";

type IJitsiRoom = any; //to fill later

type IRoom = IJitsiRoom & {
  egoUser: IUser;
  users: { [userId: string]: IUser };
}


type ITrack = any; //to fill later
type IAudioTrack = ITrack&{audioLevel:number}
type IVideoTrack = ITrack&{}

export type IUser = {
  userId: string;
  audio?: ITrack;
  video?: ITrack;
};

type IState = {
  roomName: string;
  room: IRoom;
}

type IRoomStore = IState & {
  joinRoom: (roomName: string) => void;
};

const initialState: IState = {
  roomName: "",
  room: {
    egoUser: { userId: "" },
    users: {},
  },
};

function createStore() {
  const Context = React.createContext<IRoomStore>({
    ...initialState,
    joinRoom: (roomName: string) => undefined,
  });

  function Provider({ children }: { children: React.ReactNode }) {
    const [state, stateSetter, setState] = createStateSetter(
      useState<IState>(initialState)
    );
    const connectionStore = ConnectionStore.useStore();
    const JitsiMeetJS = connectionStore.jitsi;

    useEffect(() => {
      console.log("join room",connectionStore.connection , JitsiMeetJS , state.roomName)
      if (connectionStore.connection && JitsiMeetJS && state.roomName) {
        const room = connectionStore.connection.initJitsiConference(
          state.roomName,
          conferenceOptions
        );
        room.on(
          JitsiMeetJS.events.conference.TRACK_ADDED,
          on_remote_track_added
        );
        room.on(
          JitsiMeetJS.events.conference.TRACK_REMOVED,
          on_remote_track_removed
        );
        room.on(
          JitsiMeetJS.events.conference.CONFERENCE_JOINED,
          on_conference_joined
        );
        room.on(JitsiMeetJS.events.conference.USER_JOINED, on_user_joined);
        room.on(JitsiMeetJS.events.conference.USER_LEFT, on_user_left);
        // r.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, onTrackToggleMuted);
        // r.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, onUserNameChanged);
        room.on(
          JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
          on_remote_track_audio_level_changed
        );
        // r.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, onPhoneNumberChanged);
        room.addCommandListener("pos", on_position_received);
        room.join(); // FFFUUUUUUUUUUUUCK THATS IT GOD DAMNIT
        console.log("state:",state,stateSetter,room)
        stateSetter.room.set(room);
      }
      return () => {
        setState((state) => {state.room.leave&&state.room.leave()
          return state});
      };
    }, [state.roomName,connectionStore.connection, JitsiMeetJS]);

    const on_remote_track_added = (track) => {
      if (track.isLocal()) return; // also run on your own tracks so exit
      track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
        console.log("remote track stopped")
      );
      track.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        (deviceId) =>
          console.log(`track audio output device was changed to ${deviceId}`)
      );

      const id = track.getParticipantId(); // get user id of track
      const trackType = track.getType() === "audio" ? "audio" : "video";
      // stateSetter.room.users.setKey(id, { userId: id, [trackType]: track });
      track.getType() === "audio" ? addAudioTrack(track) : addVideoTrack(track)
    };

    const addAudioTrack = (track) => {
      const id = track.getParticipantId(); // get user id of track
      track.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, audiolevel=>state.room.users[id].audio.audioLevel.set(audiolevel))
      track.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('remote track muted')) //maybe there'S an error thrown because jitsi holds a reference of the track on participant disconnect
      stateSetter.room.users[id].audio.set(track);
      console.log("addAudioTrack:",track);
    };
                  const addVideoTrack = (track) => {
                  }

    const on_remote_track_removed = (track) => {
      console.log("on_remote_track_removed:",track);
    };

    const on_conference_joined = () => {};
    const on_user_joined = (id) => {
      stateSetter.room.users.set(users=>({...users,[id]:{ userId: id }}))
      // stateSetter.room.users.setKey(id, { userId: id });
    };

    const on_user_left = (id) => {
      stateSetter.room.users.set((users) => omit(users, [id], true));
    };
    const on_remote_track_audio_level_changed = () => {};
    const on_position_received = () => {};
    console.log("RoomStore:",state)
    const contextObject: IRoomStore = {
      ...state,
      joinRoom: (roomName: string) => stateSetter.roomName.set(roomName),
    };

    // getPhoneState = () => contextObject
    return (
      <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
  }

  const useStore = () => useContext<IRoomStore>(Context);
  return { Provider, useStore };
}

const RoomStore = createStore();

export default RoomStore;
