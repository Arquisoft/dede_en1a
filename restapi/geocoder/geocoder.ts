
const Nominatim = require('nominatim-geocoder')

const geocoder = new Nominatim()

type Location = {
	street?: string,
	city?: string,
	region?: string
	country?: string,
}

async function tryGeocode(query: string, errorMsg: string = "") {
	return geocoder.search({q: query})
	.then((response : any) => {
		if (response[0] != {}) {
			let lat : number = response[0]["lat"]
			let lon : number = response[0]["lon"]
			let distance : number = distanceInKmBetweenEarthCoordinates(lat, lon, 43.354838799999996, -5.851292403149609)
			return {
				"distance" : distance,
				"price" : distance * parseFloat(process.env.PRICE_PER_KM || ""),
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

export async function getPriceFromAddress(address: Location) {

	if (address.street == null || address.street == '') {
		return {"error" : "needed street information"}
	}
	if (address.city == null || address.city == '') {
		return {"error" : "needed city information"}
	}
	if (address.region == null || address.region == '') {
		return {"error" : "not enough info provided, region is needed"}
	}
	if (address.country == null || address.country == '') {
		return {"error" : "not enough info provided, city is needed"}
	}


	let geocodeTry = await tryGeocode(address.city + ", " + address.street)
	if (geocodeTry.success) return geocodeTry
	
	geocodeTry = await tryGeocode(address.region + ", " + address.street)
	if (geocodeTry.success) return geocodeTry

	geocodeTry = await tryGeocode(address.region + ", " + address.city, "failed specific info, falling back to city")
	if (geocodeTry.success) return geocodeTry

	geocodeTry = await tryGeocode("Province: " + address.region, "failed specific info, falling back to region")
	if (geocodeTry.success) return geocodeTry
	
	geocodeTry = await tryGeocode("Country: " + address.country, "failed specific info, falling back to country")
	if (geocodeTry.success) return geocodeTry

	return {"error" : "Address not found"}
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