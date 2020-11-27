import * as React from 'react';
import { useUserStore } from "../Store/UserStore"
import { User } from "./User"

export const Users = () => {

  const {users} = useUserStore()

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