import XHRGetRequest from './XHRGetRequest';

const GetMinibusStopRouteETA = (stopId, routeId) => {
	const promise = new Promise(resolve => {
		XHRGetRequest(`https://crossrun.onrender.com/https://data.etagmb.gov.hk/eta/stop/${stopId}`).then(res => {
			res = res.data;
			res.forEach(routeData => {
				if (routeData.route_id === routeId) {
					resolve(routeData.eta);
				}
			});
		});
	});
	return promise;
}

export default GetMinibusStopRouteETA;
