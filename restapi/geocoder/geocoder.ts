import {readdirSync} from "fs"
import { format } from "path"
import { stringify } from "querystring"

const Nominatim = require('nominatim-geocoder')

const geocoder = new Nominatim()

type Location = {
	street: string,
	city: string,
	region?: string
	country?: string,
}

function tryGeocode(query: string, errorMsg: string = "") {
	return geocoder.search({q: query})
	.then((response : any) => {
		if (response[0] != {}) {
			let lat : number = response[0]["lat"]
			let lon : number = response[0]["lon"]
			let distance : number = distanceInKmBetweenEarthCoordinates(lat, lon, 43.354838799999996, -5.851292403149609)
			console.log(response)
			return {
				"distance" : distance,
				"price" : distance * parseInt(process.env.PRICE_PER_KM || ""),
				"error" : errorMsg,
				"success" : true			
			}
		}
		return {
			"error" : errorMsg,
			"success" : false
		}

	}).catch((error : any) => {
		return error
	})
}

export function getPriceFromAddress(address: Location) {
	let geocodeTry = tryGeocode(address.city + ", " + address.street)
	if (geocodeTry.success) return geocodeTry

	if (address.region == null) 
		return {"error" : "not enough info provided, region is needed"}
	
	geocodeTry = tryGeocode(address.region + ", " + address.street)
	if (geocodeTry.success) return geocodeTry

	geocodeTry = tryGeocode(address.city, "failed specific info, falling back to city")
	if (geocodeTry.success) return geocodeTry

	geocodeTry = tryGeocode(address.region, "failed specific info, falling back to region")
	if (geocodeTry.success) return geocodeTry

	if (address.country == null) 
		return {"error" : "not enough info provided, city is needed"}
	
	geocodeTry = tryGeocode(address.country, "failed specific info, falling back to city")
	if (geocodeTry.success) return geocodeTry
}
 

// from https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
function degreesToRadians(degrees: number) : number {
	return degrees * Math.PI / 180
}
  
function distanceInKmBetweenEarthCoordinates(lat1: number, lon1: number, lat2: number, lon2: number) : number {
	let earthRadiusKm:number = 6371

	let dLat : number = degreesToRadians(lat2-lat1)
	let dLon : number = degreesToRadians(lon2-lon1)

	lat1 = degreesToRadians(lat1)
	lat2 = degreesToRadians(lat2)

	let a : number = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2) 
	let c : number  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) 

	return earthRadiusKm * c
}