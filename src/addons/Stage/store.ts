import create from "zustand"

export const useStageStore = create((set:any) => {
	return ({
		stageVisible:false,
		onStage: false,
		usersOnStage:[],
		setVisible: (visible:boolean) => set(state => ({stageVisible:visible})),
		addUser: (user) => set(state => ({usersOnStage:[...state.usersOnStage, user]})),
		removeUser: (user) => set(state => ({usersOnStage:state.usersOnStage.filter(u => u.id !== user.id)}))
	})
})