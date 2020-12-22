import * as React from 'react';
import styled from "styled-components";

const StyledHeader = styled.a`
  &:before {
    content: "😽 ";
    margin-right: 5px;
  }
  position: fixed;
  margin: 10px 0;
  right: 50px;
  background: white;
  padding: 10px;
  border-radius: 5px; 
  z-index: 10000;
  font-weight: bold;
  text-decoration: none;
  color:#000;
  &:hover {
    color: #8823ee;
    &:before {
      content: "😻 ";
      margin-right: 5px;
    }
  }
`

export const Header = ({children}) => (
  <StyledHeader target="_blank" href="http://chatmosphere.cc">Chatmosphere</StyledHeader>
)