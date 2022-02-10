import React, { useCallback } from "react"
import styled from 'styled-components'
import { useAddonsStore } from "../../addons/addonsStore"


const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
`

const LeftBox = styled.div`
  margin: 10px;
`

const CenterBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  & > button {
    margin: 0 5px;
  }
`
  const RightBox = styled.div`
    margin: 10px;
  `

export const Footer: React.FC = ({ children }) => {
 
  return (
    <Container>
      <LeftBox></LeftBox>
      <CenterBox id="footer_center">
        {children}
        <ConnectedFooterAddons />
      </CenterBox>
      <RightBox>
        
      </RightBox>
    </Container>
  )
}

const ConnectedFooterAddons = () => {
  const footerEl = useAddonsStore(
    useCallback((store) => store.footerElements, []),
  )

  return (
    <>
      {footerEl?.map((b) => {
        console.log(b)
        return b?.el
      })}
    </>
  )
}