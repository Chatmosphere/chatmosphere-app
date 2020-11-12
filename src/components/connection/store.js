import create from 'zustand';
import omit from 'lodash';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

export const useStore = create(
	devtools((set, get) => ({
		localTracks: [],
		users: {}, //{ sajkldfjks:{audio:track, video:track}, 3ja9djak:{audio:track, video:track}  }
		addUser: (id) => set((state) => ({ users: { ...state.users, [id]: {} } })),
		removeUser: (id) => set((state) => omit(state, [ id ], true)),
		addAudioTrack: (id, track) => {
			const newUsers = produce(get().users, (draftUsers) => {
				draftUsers[id]['audio'] = track;
			});
			set((state) => ({ users: newUsers }));
		},
		addVideoTrack: (id, track) => {
			const newUsers = produce(get().users, (draftUsers) => {
				draftUsers[id]['video'] = track;
			});
			set((state) => ({ users: newUsers }));
		}
	}))
);
