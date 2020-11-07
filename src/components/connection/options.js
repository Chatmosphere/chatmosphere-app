// SETTINGS - these are Connection and Room Options for the Jitsi lib

export const conferenceName = "conference2" //introduce Zustand

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

export const connectionOptions = {
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