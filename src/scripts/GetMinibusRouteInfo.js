import XHRGetRequest from "./XHRGetRequest";

const GetMinibusRouteInfo = routeId => {
	const promise = new Promise((resolve, reject) => {
		XHRGetRequest(`https://data.etagmb.gov.hk/route/${routeId}`).then(res => {
			resolve(res.data[0])
		});
	});
	return promise;
}

export default GetMinibusRouteInfo