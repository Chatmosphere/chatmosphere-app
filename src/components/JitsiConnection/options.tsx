// SETTINGS - these are Connection and Room Options for the Jitsi lib

export const conferenceName = process.env.REACT_APP_CONFERENCE_NAME || "conference"

export const conferenceOptions = {
  openBridgeChannel: false, //what is this doing?
}

export interface IJitsiInitOptions {
  disableAudioLevels?: boolean
  disableSimulcast?: boolean
  useIPv6?: boolean
  enableWindowOnErrorHandler?: boolean
  disableThirdPartyRequests?: boolean
  enableAnalyticsLogging?: boolean
}

export const jitsiInitOptions: IJitsiInitOptions = {
  disableAudioLevels: false,
  // disableSimulcast: false,
  // // useIPv6:true, // can be off
  // enableWindowOnErrorHandler: false,
  // disableThirdPartyRequests: false,
  // enableAnalyticsLogging: true
}

export const localTrackOptions = {
  devices: ["audio", "video"],
  resolution: 480,
  minFps: 15,
  maxFps: 15,
  constraints: {
    video: {
      height: {
        ideal: 360,
        max: 360,
        min: 240,
      },
      frameRate: {
        max: 15,
      },
    },
  },
}

export const getConnectionOptions = (conferenceName?: string): object => {
  let serverConfig: any = {}

  //The environment variable REACT_APP_CHATMOSPHERE_RESERVED_CONFERENCE_NAME is reserved for Chatmosphere. Using it might create side effects
  if (conferenceName && conferenceName !== process.env.REACT_APP_CHATMOSPHERE_RESERVED_CONFERENCE_NAME) {
    //Idea: We set default to our default session - if they change to something else -> Public Jitsi is used;
    serverConfig = require("./../../serverConfig-example")
  } else {
    try {
      serverConfig = require("./../../serverConfig")
    } catch (e) {
      serverConfig = require("./../../serverConfig-example")
    }
  }
  return serverConfig.connectionOptions
}
