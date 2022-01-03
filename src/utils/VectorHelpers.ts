import { audioRadius } from "./LookupTable"

export const getVectorDistance = (p1:IPoint, p2:IPoint):number => {
	const a = p1.x - p2.x
	const b = p1.y - p2.y
	const c = Math.sqrt(a*a + b*b)
	return c
}

export const mapVolumeToDist = (max:number, dist:number):number => {
	const volume = 1 - dist/max
	const p = volume > 0 ? volume : 0
	return p
}

export const getVolumeByDistance = (p1:IPoint, p2:IPoint):number => {
	const d = getVectorDistance(p1, p2)
	// const dWidth = document.body.clientWidth / 2 // relative distance based on screen size
	const v = mapVolumeToDist(audioRadius, d)
	return v
}

export const isOnScreen = (pos:IPoint, width:number, height:number):boolean => {
	const x = pos.x
	const y = pos.y
	const isX = x > -width + 300 && x < window.innerWidth - 300
	const isY = y > -height + 300 && y < window.innerHeight - 300
	return isX && isY
}