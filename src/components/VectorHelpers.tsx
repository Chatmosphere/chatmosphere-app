type Point = {x:number, y:number}

export const getVectorDistance = (p1:Point, p2:Point):number => {
	const a = p1.x - p2.x
	const b = p1.y - p2.y
	const c = Math.sqrt(a*a + b*b)
	return c
}

export const mapVolumeToDist = (max:number, dist:number):number => {
	const p = dist/max
	return p
}

export const getVolumeByDistance = (p1:Point, p2:Point):number => {
	const d = getVectorDistance(p1, p2)
	const dWidth = document.body.clientWidth
	const v = mapVolumeToDist(dWidth, d)
	return v
}