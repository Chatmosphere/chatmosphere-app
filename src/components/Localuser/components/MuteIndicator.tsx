import React from 'react';
import styled from 'styled-components';
import { useLocalStore } from './../../../store/LocalStore';
import {ReactComponent as MuteCat} from './../../../assets/muteCatSmall.svg'
import { MuteContainer } from '../../User/MuteIndicator';



export const MuteIndicator = () => {

  const {toggleMute} = useLocalStore()

  const handleClick = () => {
    toggleMute()
  } 

  return (
    <MuteContainer onClick={handleClick}>
      <MuteCat />
    </MuteContainer>
  )
}

