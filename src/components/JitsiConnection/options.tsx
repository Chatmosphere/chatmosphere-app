// SETTINGS - these are Connection and Room Options for the Jitsi lib

export const conferenceName = "conference" //introduce Zustand

export const conferenceOptions = {
  openBridgeChannel: false //what is this doing?
}

export interface IJitsiInitOptions {
  disableAudioLevels?:boolean,
  disableSimulcast?:boolean,
  useIPv6?:boolean,
  enableWindowOnErrorHandler?:boolean,
  disableThirdPartyRequests?:boolean,
  enableAnalyticsLogging?:boolean
}

export const jitsiInitOptions:IJitsiInitOptions = {
  disableAudioLevels: false,
  // disableSimulcast: false,
  // // useIPv6:true, // can be off
  // enableWindowOnErrorHandler: false,
  // disableThirdPartyRequests: false,
  // enableAnalyticsLogging: true
}

export const localTrackOptions = {
  devices: [ 'audio', 'video' ],
  resolution: 480,
  minFps: 15,
  maxFps: 15,
  constraints: {
    video: {
      height: {
          ideal: 360,
          max: 360,
          min: 240
      },
     frameRate: {
        max: 15
     }
    }
  }
}

export const getConnectionOptions = ():object => {

  let serverConfig:any = {}
  try{
    serverConfig = require('./../../serverConfig')
  }catch(e) {
    serverConfig = require('./../../serverConfig-example')
  }

  return serverConfig.connectionOptions
 
}