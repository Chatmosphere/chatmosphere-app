import * as React from 'react';
import { useConferenceStore } from '../../Store/ConferenceStore';
import { User } from "./User"

//TODO check if incorporation of user Object causes rerendering problems
export const Users = () => {

  const {users} = useConferenceStore()
  return (
    <>
    {Object.entries(users).map(user => {
      return(
          <User key={user[0]} user={user[1]} id={user[0]}/>
      )
    })}
    </>
  )
}