import React from 'react';
import styled from 'styled-components';

const RoomContainer = styled.div`
  /* fixed size won't work, because when scale is 1 there will be room to pan; but the plugin won't allow it because scale is 1. */
  /* width:10000px;
  height:10000px; */
  width:100vw;
  height:100vh;
`

const Background = styled.div`
  background-image:url("/build/favicon.ico");
  opacity:0.1;
  width:100%;
  height:100%;
`

export const Room:React.FC = (props) => {
  return (
    <RoomContainer>
      <Background />
      {props.children}
    </RoomContainer>
  )
}