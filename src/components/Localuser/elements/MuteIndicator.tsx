import React from 'react';
import styled from 'styled-components';
import { useLocalStore } from './../../../store/LocalStore';
import {ReactComponent as MuteCat} from './../../../assets/muteCatBig.svg'


const Indicator = styled.div`
  position: absolute;
  top: 20px;
  left: 14px;
`

export const MuteIndicator = () => {

  const {toggleMute} = useLocalStore()

  const handleClick = () => {
    toggleMute()
  } 

  return (
    <Indicator onClick={handleClick}>
      <MuteCat />
    </Indicator>
  )
}

