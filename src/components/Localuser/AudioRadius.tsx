import React from 'react'
import styled from 'styled-components'

export const AudioRadius = styled.div`
position: absolute;
transform: translate(-50%, -50%);
left: 50%;
top: 50%;
border: 2px dotted #ccc;
width: 1000px;
height: 1000px;
display: block;
border-radius: 500px;
pointer-events: none;
background: radial-gradient();
z-index: -100;
`