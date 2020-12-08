import React from 'react';
import styled from 'styled-components';
import { useLocalStore } from '../Store/LocalStore';


const Indicator = styled.div`
  position: absolute;
  top:20px;
  left: 36px;
  font-size:8rem;
`

export const MuteIndicator = ({children}) => {

  const {toggleMute} = useLocalStore()

  const handleClick = () => {
    toggleMute()
  } 

  return (
    <Indicator onClick={handleClick}>
      {children}
    </Indicator>
  )
}

