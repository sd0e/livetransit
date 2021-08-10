import XHRGetRequest from './XHRGetRequest';

const getStopURL = (company, stopId) => {
	switch (company) {
		case 'KMB': {
			return `https://data.etabus.gov.hk/v1/transport/kmb/stop/${stopId}`;
		}
		case 'Citybus': {
			return `https://rt.data.gov.hk/v1/transport/citybus-nwfb/stop/${stopId}`;
		}
		case 'NWFB': {
			return `https://rt.data.gov.hk/v1/transport/citybus-nwfb/stop/${stopId}`;
		}
		case 'Default': {
			return 'Route not found';
		}
		default: {
			return `https://data.etabus.gov.hk/v1/transport/kmb/stop/${stopId}`;
		}
	}
}

const allFinished = arr => {
	for (let idx = 0; idx < arr.length; idx++) {
		const el = arr[idx];
		if (el !== true) {
			return false;
		}
	}
	return true;
}

const GetAllStopJSON = (stopIds, company) => {
	const promise = new Promise(resolve => {
		let stopJSON = new Array(stopIds.length);
		let finished = new Array(stopIds.length);

		const oneFinished = () => {
			if (allFinished(finished)) {
				resolve(stopJSON);
			}
		}

		stopIds.forEach((stopId, idx) => {
			XHRGetRequest(getStopURL(company, stopId)).then(individualStopJSON => {
				stopJSON[idx] = individualStopJSON;
				finished[idx] = true;
				oneFinished();
			});
		});
	});
	return promise;
}

export default GetAllStopJSON;