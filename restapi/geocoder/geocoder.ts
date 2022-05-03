
const Nominatim = require('nominatim-geocoder')

const geocoder = new Nominatim()

type Location = {
	street?: string,
	city?: string,
	region?: string
	country?: string,
}

async function tryGeocode(query: string) {
	return geocoder.search({q: query})
	.then((response : any) => {
		if (response[0] != {}) {
			let lat : number = response[0]["lat"]
			let lon : number = response[0]["lon"]
			let distance : number = distanceInKmBetweenEarthCoordinates(lat, lon, 43.354838799999996, -5.851292403149609)
			let price = 12.35
			if (distance > 100) {
				price += distance / 100 * 1
			}
			return {
				"distance" : distance,
				"price" : price,//distance / 100 * parseFloat(process.env.PRICE_PER_KM || "1"),
				"success" : true			
			}
		}
		return {
			"success" : false
		}

	}).catch((error : any) => {
		return error
	})
}

export async function getPriceFromAddress(address: Location) {

	if (address.street == undefined || address.street == null || address.street == '') {
		throw new Error('needed street')
	}
	if (address.city == undefined || address.city == null || address.city == '') {
		throw new Error('needed city')
	}
	if (address.region == undefined || address.region == null || address.region == '') {
		throw new Error('needed region')
	}
	if (address.country == undefined || address.country == null || address.country == '') {
		throw new Error('needed country')
	}


	let geocodeTry = await tryGeocode(address.city + ", " + address.street)
	if (geocodeTry.success) return geocodeTry

	geocodeTry = await tryGeocode(address.region + ", " + address.city + ', '+ address.street)
	if (geocodeTry.success) return geocodeTry

	geocodeTry = await tryGeocode(address.country + ', ' + address.region + ", " + address.city + ', '+ address.street)
	if (geocodeTry.success) return geocodeTry
	
	geocodeTry = await tryGeocode(address.region + ", " + address.street)
	if (geocodeTry.success) return geocodeTry

	geocodeTry = await tryGeocode(address.region + ", " + address.city)
	if (geocodeTry.success) return geocodeTry

	geocodeTry = await tryGeocode(address.country + ', ' + address.region + ", " + address.city)
	if (geocodeTry.success) return geocodeTry

	geocodeTry = await tryGeocode(address.city + ', ' + address.region)
	if (geocodeTry.success) return geocodeTry

	geocodeTry = await tryGeocode(address.region)
	if (geocodeTry.success) return geocodeTry
	
	geocodeTry = await tryGeocode(address.country)
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