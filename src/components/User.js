import React, { useEffect } from 'react';

export const User = ({id, tracks}) => {

  useEffect(() => {
    console.log("PASSED USER IS ", id)
    console.log("Tracks are ", tracks)

  },[tracks])
  
  return(
    <div>This is {id}</div>
  )
}