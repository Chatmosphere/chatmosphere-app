import React from "react"
import styled from 'styled-components'
import Chat from "../../addons/Chat/Chat"


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
      <CenterBox>
       {children}
      </CenterBox>
      <RightBox>
        <Chat />
      </RightBox>
    </Container>
  )
}

// const ConnectedFooterAddons = () => {
//   const footerEl = useAddonsStore(
//     useCallback((store) => store.footerElements, []),
//   )
//
//   return (
//     <>
//       {footerEl?.map((b) => {
//         console.log(b)
//         return b?.el
//       })}
//     </>
//   )
// }
