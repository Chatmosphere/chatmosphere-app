import create from 'zustand';
import omit from 'lodash';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { getVolumeByDistance } from '../VectorHelpers';



export const useStore = create((set, get) => ({
		//  IMMER PRODUCER
		set: fn => set(produce(fn)),
		//  CONNECTION PART
		jsMeet: null,
		setJsMeet: (jsMeet) => set(state => produce(state, draft => {draft.jsMeet = jsMeet})),
		room: null,
		setRoom: (room) => set({room: room}),
		conferenceJoined: false,
		setConferenceJoined: () => set(state => ({conferenceJoined: true})),
		setConferenceLeft: () => set(state => ({conferenceJoined: false})),
		// LOCAL USER
		localTracks: [],
		setLocalTracks: (tracks) => set({localTracks: tracks}),
		clearLocalTracks: () => {
			const localTracks = get().localTracks
			localTracks.map(track => track.dispose()) 
		},
		localPos: {x:0, y:0},
		setLocalPos: (newPos) => set({localPos: newPos}),
		//  REMOTE USERS
		users: {}, //{ sajkldfjks:{audio:track, video:track}, 3ja9djak:{audio:track, video:track}  }
		addUser: (id) => set((state) => produce(state, (draft) => {
			draft.users[id] = {mute:false, volume:1, pos:{x:0,y:0}}
		})),
		// removeUser: (id) => set((state) => omit(state, [id], true)),
		removeUser: (id) => set(state => produce(state, newState => {
			delete newState.users[id]
		})),
		clearUsers: () => {
			const users = get().users
			Object.keys(users).map(id => {
				const user = users[id]
				user['audio'].dispose()
				user['video'].dispose()
			})
		},
		updateUserPos: (id, pos) => {
			set(state => produce(state, newState => {
				if(newState.users[id]) newState.users[id]['pos'] = pos
			}))
		},
		addAudioTrack: (id, track) => {
			const newUsers = produce(get().users, (draftUsers) => {
				draftUsers[id]['audio'] = track;
			});
			set((state) => ({ users: newUsers }));
		},
		removeAudioTrack: id => {
			const user = get().users[id]
			const track = user['audio']
			track.removeEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => get().toggleMute(id, track)) //works but is called twice 
		},
		calculateVolume: (participantId) => {
			const user = get().users[participantId]
			const lPos = get().localPos
			set(state => produce(state, newState => {
				const d = getVolumeByDistance(lPos, user.pos)
				newState.users[participantId]['volume'] = d
			}))
		}, 
		calculateVolumes: (localPos) => {
			const users = get().users
			set(state => produce(state, newState => {
				Object.keys(users).map((key, i) => {
					const user = users[key]
					const d = getVolumeByDistance(localPos, user.pos)
					newState.users[key]['volume'] = d
				})
			}))
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

