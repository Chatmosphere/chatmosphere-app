import { useConferenceStore } from "../../../store/ConferenceStore"
import { User } from "./StageUser"

const userSelector = store => store.users

export const StageUsers = () => {
  const users: IUsers = useConferenceStore(userSelector)

  return (
    <>
      {Object.entries(users).map(user => {
        if (user[1]?.properties?.onStage) {
          // console.log("rerender")
          /**
           TODO this is rerendering on every move, even though react will diff it out, Im not sure thats cool;
           we only need updates if properties change so we could have a stageusers array instead;
           -> could also have a "users Visible" array to only render them on stage at all
           */
          
          return <User key={user[0]} audio={user[1].audio} video={user[1].video} />
        }
        return null
      })}
    </>
  )
}