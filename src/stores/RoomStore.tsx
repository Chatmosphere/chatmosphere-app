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

type ITrack = any; //to fill later

export type IAudioTrack = ITrack & {
  audioLevel: number;
  // attach: (element: any) => void;
};
export type IVideoTrack = ITrack & {
  // attach: (element: any) => void;
};

export type IUser = {
  userId: string;
  audio?: IAudioTrack;
  video?: IVideoTrack;
};

type IRoom = {
  joined: boolean;
  egoUser?: IUser;
  users: { [userId: string]: IUser };
};

type IState = {
  roomName: string;
  room: IRoom;
  jitsiRoom: IJitsiRoom;
};

type IRoomStore = IState & {
  joinRoom: (roomName: string) => void;
};

const initialState: IState = {
  roomName: "",
  room: {
    joined: false,
    egoUser: undefined,
    users: {},
  },
  jitsiRoom: undefined,
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
      console.log(
        "join room",
        connectionStore.connection,
        JitsiMeetJS,
        state.roomName,
        conferenceOptions
      );
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
        console.log("state:", { state, stateSetter, room });
        stateSetter.jitsiRoom.set(room);
      }
      return () => {
        setState((state) => {
          state.jitsiRoom?.leave();
          return state;
        });
      };
    }, [state.roomName, connectionStore.connection, JitsiMeetJS]);

    useEffect(() => {
      if (JitsiMeetJS) {
        JitsiMeetJS.createLocalTracks({ devices: ["audio", "video"] }, true)
          .then(onLocalTracksAdded)
          .catch((error) => {
            throw error;
          });
      }
    }, [JitsiMeetJS]);

    useEffect(() => {
      if (state.room.joined) {
        try{state.jitsiRoom.addTrack(state.room.egoUser?.audio)}catch(e){}
        try{connectionStore.connection.addTrack(state.room.egoUser?.audio)}catch(e){}
        try{connectionStore.jitsi.addTrack(state.room.egoUser?.audio)}catch(e){}
      }
    }, [state.room.joined,state.room.egoUser?.audio]);

    useEffect(() => {
      if (state.room.joined) {
        console.log("addTrack:",state.room.egoUser?.video,state.jitsiRoom)
        try{state.jitsiRoom.addTrack(state.room.egoUser?.video)}catch(e){}
        try{connectionStore.connection.addTrack(state.room.egoUser?.video)}catch(e){}
        try{connectionStore.jitsi.addTrack(state.room.egoUser?.video)}catch(e){}
      }
    }, [state.room.joined,state.room.egoUser?.video]);

    const on_remote_track_added = (track) => {
      console.log("on_remote_track_added:",track)
      if (track.isLocal()) return; // also run on your own tracks so exit
      track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
        console.log("remote track stopped")
      );
      track.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        (deviceId) =>
          console.log(`track audio output device was changed to ${deviceId}`)
      );

      // stateSetter.room.users.setKey(id, { userId: id, [trackType]: track });
      track.getType() === "audio" ? addAudioTrack(track) : addVideoTrack(track);
    };

    function onLocalTracksAdded(tracks) {
      stateSetter.room.egoUser?.set({userId:tracks[0].getParticipantId()})
      let localTracks = tracks;
      console.log("LOCAL TRACKS ADDED ", localTracks,state.room.joined);
      localTracks.map(function (localTrack, i) {
        console.log("Tracks parsed ", localTrack, " Number ", i);
        
        localTrack.getType() === "video"
          ? addVideoTrack(localTrack, true)
          : addAudioTrack(localTrack, true);
        // if (state.room.joined) room.addTrack(localTrack)
      });
    }

    const addAudioTrack = (track, ego?: boolean) => {
      const id = track.getParticipantId(); // get user id of track
      const user = ego ? stateSetter.room.egoUser : stateSetter.room.users[id];
      track.addEventListener(
        window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        (audiolevel) => user?.audio?.audioLevel.set(audiolevel)
      );
      track.addEventListener(
        window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
        () => console.log("remote track muted")
      ); //maybe there'S an error thrown because jitsi holds a reference of the track on participant disconnect
      // localTrack.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, on_local_tracks_stopped)
      // localTrack.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, on_local_track_audio_output_changed)
      user?.set(user=>({...user,audio:track,id:id}));
      // user?.audio.set(track);
      console.log("addAudioTrack:", { ego, id, track });
    };
    const addVideoTrack = (track, ego?: boolean) => {
      const id = track.getParticipantId(); // get user id of track
      const user = ego ? stateSetter.room.egoUser : stateSetter.room.users[id];
      user?.set(user=>({...user,video:track,id:id}));
    };

    const on_remote_track_removed = (track) => {
      console.log("on_remote_track_removed:", track);
    };

    const on_conference_joined = () => {
      stateSetter.room.joined.set(true);
    };
    const on_user_joined = (id) => {
      console.log("on_user_joined:",id)
      stateSetter.room.users.set((users) => ({
        ...users,
        [id]: { userId: id },
      }));
      // stateSetter.room.users.setKey(id, { userId: id });
    };

    const on_user_left = (id) => {
      stateSetter.room.users.set((users) => omit(users, [id], true));
    };
    const on_remote_track_audio_level_changed = () => {};
    const on_position_received = () => {};
    console.log("RoomStore:", state);
    const contextObject: IRoomStore = {
      ...state,
      joinRoom: (roomName: string) => {
        console.log("joinRoom:", roomName);
        stateSetter.roomName.set(roomName);
      },
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
