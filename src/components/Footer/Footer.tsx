import React from "react"
import { SocialIcons } from "./SocialIcons"
import { CallControlBox } from "./CallControlBox"


export const Footer: React.FC = ({ children }) => {
 
  return (
    <>
      <CallControlBox>
       {children}
      </CallControlBox>
      <SocialIcons />
    </>
  )
}
