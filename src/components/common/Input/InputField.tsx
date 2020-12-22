import styled from "styled-components";

export const InputField: any = styled.input`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1px solid blue;
  }
`;
