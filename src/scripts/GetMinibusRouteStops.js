import XHRGetRequest from "./XHRGetRequest";

const GetMinibusRouteStops = routeId => {
	const promise = new Promise((resolve, reject) => {
		XHRGetRequest(`https://data.etagmb.gov.hk/route-stop/${routeId}/1`).then(res => {
			resolve(res.data.route_stops);
		});
	});
	return promise;
}

export default GetMinibusRouteStops;