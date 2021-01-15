import React from 'react';
import { ErrorHandler } from '../../components/common/Info/ErrorHandler';
import { Info } from '../../components/common/Info/Info';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import JitsiConnection from '../../components/JitsiConnection/JitsiConnection';
import { LocalUserContainer } from '../../components/Localuser/LocalUserContainer';
import { PanWrapper } from '../../components/PanWrapper/PanWrapper';
import { Room } from '../../components/Room/Room';
import { Users } from '../../components/User/Users';
import { LocalStoreLogic } from '../../store/LocalStoreLogic';

export const Session = () => {
  return (
    <>
      <Info>
        Welcome to our Prototype
        <br />
        Please use <b>Safari</b> or <b>Chrome</b> for now for a stable Experience
      </Info>
      <ErrorHandler />
      <Header>Chatmosphere</Header>
      <JitsiConnection />
      <LocalStoreLogic />
      <PanWrapper>
        <Room>
          <Users />
          <LocalUserContainer />
        </Room>
      </PanWrapper>
      <Footer mute endCall />
    </>
  )
}