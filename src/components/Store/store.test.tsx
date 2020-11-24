import create from "zustand"
import { useStore } from "./store"

const testUsers = {users: {
  sajkldfjks: {
    audio: undefined,
    video: undefined
  }
}}

//quite difficult to test, maybe reducers would be better for that :)
it('removes an object', () => {
  const removeuser = useStore.getState().removeUser
  const addUser = useStore.getState().addUser
  const users = useStore.getState().users
  addUser('sajkldfjks')
  removeuser('sajkldfjks')
  expect(users).toEqual({})
})