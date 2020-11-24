import styled from "styled-components";

export const Header = styled.div`
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
`