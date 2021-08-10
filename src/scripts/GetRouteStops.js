import XHRGetRequest from './XHRGetRequest';
import ObjIsEmpty from './ObjIsEmpty';

const GetRouteStops = (route, company, direction = 'outbound') => {
	const promise = new Promise(resolve => {
		let routeURL;

		switch (company) {
			case 'KMB': {
				routeURL = `https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${route}/${direction}/1`;
				break;
			}
			case 'Citybus': {
				routeURL = `https://rt.data.gov.hk/v1/transport/citybus-nwfb/route-stop/CTB/${route}/${direction}`;
				break;
			}
			case 'NWFB': {
				routeURL = `https://rt.data.gov.hk/v1/transport/citybus-nwfb/route-stop/NWFB/${route}/${direction}`;
				break;
			}
			case 'Default': {
				resolve('Route not found');
				break;
			}
			default: {
				routeURL = `https://data.etabus.gov.hk/v1/transport/kmb/route/${route}/${direction}/1`;
			}
		}

		XHRGetRequest(routeURL).then(res => {
			if (!ObjIsEmpty(res.data)) {
				// Stop data available
				resolve(res.data);
			} else {
				// No stop data available
				resolve(-1);
			}
		});
	});
	return promise;
}

export default GetRouteStops;