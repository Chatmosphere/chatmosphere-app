import { useConferenceStore } from './../../store/ConferenceStore';
import { User } from "./User"

//TODO check if incorporation of user Object causes rerendering problems

const userSelector = store => store.users

export const Users = () => {

  const users = useConferenceStore(userSelector)
  return (
    <>
    {Object.entries(users).map((user) => {
      //@ts-ignore
      // if(user[1]?.properties?.onStage) return <StageUser key={user[0]} user={user} />
      return <User key={user[0]} id={user[0]}/>
    })}
    </>
  )
}