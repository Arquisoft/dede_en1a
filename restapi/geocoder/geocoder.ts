const Nominatim = require('nominatim-geocoder')

const geocoder = new Nominatim();


// TODO: unhardcode warehouse
export function getPriceFromAddress(address: String, warehouse:Number=0) {
	return geocoder.search({q: address})
	.then((response : any) => {
		
		let lat : number = response[0]["lat"];
		let lon : number = response[0]["lon"];
		let distance : number = distanceInKmBetweenEarthCoordinates(lat, lon, 43.354838799999996, -5.851292403149609);
		return {
			"distance" : distance,
			"price" : distance * parseInt(process.env.PRICE_PER_KM || "")
		}

	}).catch((error : any) => {
		return error;
	})
}
 

// from https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
function degreesToRadians(degrees: number) : number {
	return degrees * Math.PI / 180;
}
  
function distanceInKmBetweenEarthCoordinates(lat1: number, lon1: number, lat2: number, lon2: number) : number {
	let earthRadiusKm:number = 6371;

	let dLat : number = degreesToRadians(lat2-lat1);
	let dLon : number = degreesToRadians(lon2-lon1);

	lat1 = degreesToRadians(lat1);
	lat2 = degreesToRadians(lat2);

	let a : number = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	let c : number  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

	return earthRadiusKm * c;
}