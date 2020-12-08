// SETTINGS - these are Connection and Room Options for the Jitsi lib

export const conferenceName = "conference" //introduce Zustand

export const conferenceOptions = {
  openBridgeChannel: false //what is this doing?
}

export const jitsiInitOptions = {
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

const connectionOptions = {
  // serviceUrl: 'wss://jitsi.chatmosphere.cc/xmpp-websocket',
  // serviceUrl: '//jitsi.chatmosphere.cc/http-bind',
  hosts: {
    domain: "jitsi.chatmosphere.cc",
    muc: 'conference.jitsi.chatmosphere.cc',
    // anonymousdomain: ''
  },
  bosh: '//jitsi.chatmosphere.cc/http-bind',

  clientNode: 'http://jitsi.org/jitsimeet'
}

export const publicOptions = {
  hosts: {
     domain: 'meet.jit.si',
     muc: 'conference.meet.jit.si', 
     focus: 'focus.meet.jit.si',
  }, 
  // externalConnectUrl: 'https://meet.jit.si/http-pre-bind', 
  // enableP2P: true, 
  // p2p: { 
  //    enabled: true, 
  //    preferH264: true, 
  //    disableH264: true, 
  //    useStunTurn: true,
  // }, 
  // useStunTurn: true, 
  bosh: `https://meet.jit.si/http-bind?room=liveroom`,
  // serviceUrl: `//server.com/http-bind`,
  // websocket: 'wss://meet.jit.si/xmpp-websocket', 
  clientNode: 'http://jitsi.org/jitsimeet', 
 }

 export const getConnectionOptions = (url:string):object => {
  return ({
    hosts: {
      domain: `${url}`,
      muc: `conference.${url}`,
      // focus: `focus.${url}`,
      // anonymousdomain: ''
    },
    // bosh: `//${url}/http-bind`,
    serviceUrl: `//${url}/http-bind`, //for Public Jitsi it seems we need to pass ?room=conferenceName
    // clientNode: `https://chatmosphere.cc`
    clientNode: 'http://jitsi.org/jitsimeet', 
  })
 }