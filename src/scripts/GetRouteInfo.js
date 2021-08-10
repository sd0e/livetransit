import XHRGetRequest from "./XHRGetRequest";

const GetRouteInfo = (route, company, direction = 'outbound') => {
	const promise = new Promise(resolve => {
		let routeURL;

		switch (company) {
			case 'KMB': {
				routeURL = `https://data.etabus.gov.hk/v1/transport/kmb/route/${route}/${direction}/1`;
				break;
			}
			case 'Citybus': {
				routeURL = `https://rt.data.gov.hk/v1/transport/citybus-nwfb/route/CTB/${route}`;
				break;
			}
			case 'NWFB': {
				routeURL = `https://rt.data.gov.hk/v1/transport/citybus-nwfb/route/NWFB/${route}`;
				break;
			}
			case 'Green Minibus (NT)': {
				routeURL = `https://data.etagmb.gov.hk/route/NT/${route}`;
				break;
			}
			case 'Green Minibus (KLN)': {
				routeURL = `https://data.etagmb.gov.hk/route/KLN/${route}`;
				break;
			}
			case 'Green Minibus (HKI)': {
				routeURL = `https://data.etagmb.gov.hk/route/HKI/${route}`;
				break;
			}
			case 'Default': {
				resolve('Route not found');
				break;
			}
			default: {
				routeURL = `https://data.etabus.gov.hk/v1/transport/kmb/route/${route}/outbound/1`;
			}
		}

		XHRGetRequest(routeURL).then(res => {
			resolve(res);
		});
	});
	return promise;
}

export default GetRouteInfo;