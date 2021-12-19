declare type JitsiMeetJS = any

declare type ITrack = {
  track:{id:string}
  containers:any[]
  getType: () => deviceType
  dispose: () => void
  isLocal: () => boolean
  isMuted: () => boolean
  mute: () => void
  unmute: () => void
  addEventListener: (eventType:string,callback:(...rest)=>void) => boolean
  removeEventListener: (eventType:string,callback:(...rest)=>void) => boolean
  getParticipantId: () => ID
  attach: (element:HTMLElement) => void
  detach: (element:HTMLElement) => void
}

declare type IPoint = {x:number, y:number}

declare type IAudioTrack = ITrack
declare type IVideoTrack = ITrack 

declare type IJitsiConference={
  on: (eventType:string,callback:(...rest)=>void) => boolean
  addCommandListener: (command:string,callback:(e:any)=>void) => boolean
  sendCommand: (command:string,payload:any) => boolean
  join:()=>void
  setDisplayName:(name:string)=>void
  addTrack:(track:ITrack)=>Promise<any>
  myUserId:()=>ID
  setReceiverConstraints:(object)=>void
  leave:()=>void
}

declare type IJitsiEvents = {
  track: {
    LOCAL_TRACK_STOPPED
    TRACK_AUDIO_OUTPUT_CHANGED
    TRACK_AUDIO_LEVEL_CHANGED
  }
  conference: {
    USER_JOINED
    USER_LEFT
    TRACK_ADDED
    TRACK_REMOVED
    CONFERENCE_JOINED
    TRACK_MUTE_CHANGED
    CONFERENCE_ERROR
  }
  connection: {
    CONNECTION_ESTABLISHED
    CONNECTION_FAILED
    CONNECTION_DISCONNECTED
  }
}

declare type Vector2 = {x:number, y:number}
//Feels like ZoomPan doesnt belong to LocalStore; maybe state of panHandler or own store?
 declare type ZoomPan = {
  pos:Vector2
  pan:Vector2 
  scale:number
  onPanChange: (params:any) => void
} 

declare type ILocalStore = {
  setLocalPosition: (newPosition:Vector2) => void
  setLocalTracks: (tracks:ITrack[]) => void
  toggleMute: () => void
  clearLocalTracks: () => void
  setMyID: (id:string) => void
} & IUser & ZoomPan

declare type deviceType = "audio" | "video" | "desktop"

declare type IMediaDevices = {
  isDevicePermissionGranted: (type?: deviceType) => Promise<boolean>
}

declare type IJsMeet = {
  init: (options: IJitsiInitOptions) => void
  addTrack: (track: ITrack) => void
  events: IJitsiEvents
  mediaDevices: IMediaDevices
  createLocalTracks: (
    options: { devices: deviceType[] },
    notSure: boolean,
  ) => Promise<ITrack[]>
  JitsiConnection: any
}
declare type IJitsiConnection = {
  initJitsiConference: (
    conferenceName: string,
    conferenceOptions,
  ) => IJitsiConference
  connect: () => void
  disconnect: () => void
  xmpp:any
}

declare type IConferenceStore = {
  serverUrl: string
  jsMeet?: IJsMeet
  serverConnection?: IJitsiConnection
  isConnectedToServer: boolean
  error:any
  initJitsiMeet: () => any
  setConnected: () => void
  setDisconnected: () => void
  connectServer: (conferenceName: string) => void
  disconnectServer: () => void
}

declare type IConnectionStore = {
  serverUrl: string //needed for?
  jsMeet?: IJsMeet
  serverConnection?: IJitsiConnection
  isConnectedToServer: boolean
  error:any
  conferenceObject?: IJitsiConference
  conferenceName?: string|undefined
  hasJoinedConference?: boolean
  users?: IUsers
  displayName?:string
  initJitsiMeet: () => any
  setConnected: () => void
  setDisconnected: () => void
  connectServer: (conferenceName: string) => void
  disconnectServer: () => void
  initConference: (conferenceID:string) => void
  joinConference: () => void
  leaveConference: () => void
  setConferenceName: (name:string) => boolean
}

declare interface IJitsiInitOptions {
  disableAudioLevels?: boolean
  disableSimulcast?: boolean
  useIPv6?: boolean
  enableWindowOnErrorHandler?: boolean
  disableThirdPartyRequests?: boolean
  enableAnalyticsLogging?: boolean
  preferredCodec?: string
  disabledCodec?: string
  preferH264?: boolean //deprecated
}

// Conference STore
type IUser = { id:ID, user?:any, mute:boolean, volume:number, pos:Vector2, audio?:IAudioTrack, video?:IVideoTrack }
type IUsers = { [id:string]:IUser }
type ID = string


type ConferenceStore = {
  conferenceObject?: IJitsiConference
  conferenceName: string|undefined
  isJoined: boolean
  users: IUsers
  displayName:string
  error:any
} & ConferenceActions & UserActions

type ConferenceActions = {
  init: (conferenceID:string) => void
  join: () => void
  leave: () => void
  setConferenceName: (name:string) => boolean
}

type UserActions = {
  setDisplayName:(name:string)=>void
  calculateVolume: (id:ID) => void
  calculateVolumes: (localPos:Vector2) => void
}