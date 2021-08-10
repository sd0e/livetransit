import XHRGetRequest from './XHRGetRequest';

const getStopURL = (company, stopId, route) => {
	switch (company) {
		case 'KMB': {
			return `https://data.etabus.gov.hk/v1/transport/kmb/eta/${stopId}/${route}/1`;
		}
		case 'Citybus': {
			return `https://rt.data.gov.hk/v1/transport/citybus-nwfb/eta/CTB/${stopId}/${route}`;
		}
		case 'NWFB': {
			return `https://rt.data.gov.hk/v1/transport/citybus-nwfb/eta/NWFB/${stopId}/${route}`;
		}
		case 'Default': {
			return 'Route not found';
		}
		default: {
			return 'Route not found';
		}
	}
}

const GetStopRouteETA = (company, stopId, route) => {
	const promise = new Promise(resolve => {
		XHRGetRequest(getStopURL(company, stopId, route)).then(res => {
			resolve(res.data);
		});
	});
	return promise;
}

export default GetStopRouteETA;