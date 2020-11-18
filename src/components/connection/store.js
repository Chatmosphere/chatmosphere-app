import create from 'zustand';
import omit from 'lodash';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { useEffect } from 'react';

export const useStore = create(
	devtools((set, get) => ({
		localTracks: [],
		users: {}, //{ sajkldfjks:{audio:track, video:track}, 3ja9djak:{audio:track, video:track}  }
		addUser: (id) => set((state) => produce(state, (draft) => {
			draft.users[id] = {mute:false}
		})),
		removeUser: (id) => set((state) => omit(state, [id], true)),
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
		}
	}))
);
