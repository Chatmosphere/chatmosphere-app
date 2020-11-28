import * as React from 'react';
import { useConferenceStore } from '../Store/ConferenceStore';
import { User } from "./User"

export const Users = () => {

  const {users} = useConferenceStore()

  return (
    <>
    {Object.keys(users).map(id => {
      return(
          <User key={id} id={id}/>
      )
    })}
    </>
  )
}