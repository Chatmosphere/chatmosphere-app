import { useConferenceStore } from './../../store/ConferenceStore';
import { ConnectedUser } from "./ConnectedUser"

//TODO check if incorporation of user Object causes rerendering problems -> it causes rerendering by pos update

const userSelector = store => store.users

export const Users = () => {

  const users = useConferenceStore(userSelector)
  return (
    <>
    {Object.entries(users).map((user) => {
      //@ts-ignore
      // if(user[1]?.properties?.onStage) return <StageUser key={user[0]} user={user} />
      return <ConnectedUser key={user[0]} id={user[0]}/>
    })}
    </>
  )
}