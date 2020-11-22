import create from 'zustand';
import omit from 'lodash';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { useEffect } from 'react';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { connectionOptions, jitsiInitOptions } from '../connection/options';
import { connected } from 'process';
import { isSwitchStatement } from 'typescript';

const getInitJitsi = async () => await window.JitsiMeetJS

export const [useStore, store] = create((set, get) => ({
		//  IMMER PRODUCER
		set: fn => set(produce(fn)),
		//  CONNECTION PART
		jsMeet: null,
		setJsMeet: (jsMeet) => set(state => produce(state, draft => {draft.jsMeet = jsMeet})),
		room: null,
		setRoom: (room) => set(state => ({room: room})),
		conferenceJoined: false,
		setConferenceJoined: () => set(state => ({conferenceJoined: true})),
		setConferenceLeft: () => set(state => ({conferenceJoined: false})),
		//  REMOTE USERS
		users: {}, //{ sajkldfjks:{audio:track, video:track}, 3ja9djak:{audio:track, video:track}  }
		addUser: (id) => set((state) => produce(state, (draft) => {
			draft.users[id] = {mute:false,pos:{x:0,y:0}}
		})),
		removeUser: (id) => set((state) => omit(state, [id], true)),
		updateUserPos: (id, pos) => set(state => produce(state, newState => {newState.users[id]['pos'] = pos})),
		addAudioTrack: (id, track) => {
			track.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => get().toggleMute(id, track)) //works but is called twice 
			const newUsers = produce(get().users, (draftUsers) => {
				draftUsers[id]['audio'] = track;
			});
			set((state) => ({ users: newUsers }));
		},
		toggleMute: (id, track) => {
			set(state => produce(state, newState => {newState.users[id]['mute'] = track.muted}))
		},
		addVideoTrack: (id, track) => {
			const newUsers = produce(get().users, (draftUsers) => {
				draftUsers[id]['video'] = track;
			});
			set((state) => ({ users: newUsers }));
		},
	})
);

if(process.env.NODE_ENV === 'development') {
	mountStoreDevtool('Store', store)
}