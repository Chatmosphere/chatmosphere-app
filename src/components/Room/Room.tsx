import React from 'react';
import styled from 'styled-components';

/* fixed size won't work, because when scale is 1 there will be room to pan; but the plugin won't allow it because scale is 1. 
the fix is to set the size of the react-transform-component and react-transform-element exlusively (see App.css) */
///@TODO make this hard-coded '10000px' as a variable.
const RoomContainer = styled.div`
  width:10000px;height:10000px;
  box-sizing: border-box;
  display:block;
  // width:100vw;height:100vh;
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