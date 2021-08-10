import XHRGetRequest from './XHRGetRequest';

const allFinished = arr => {
	for (let idx = 0; idx < arr.length; idx++) {
		const el = arr[idx];
		if (el !== true) {
			return false;
		}
	}
	return true;
}

const GetAllMinibusStopJSON = stopIds => {
	const promise = new Promise(resolve => {
		let stopJSON = new Array(stopIds.length);
		let finished = new Array(stopIds.length);

		const oneFinished = () => {
			if (allFinished(finished)) {
				resolve(stopJSON);
			}
		}

		stopIds.forEach((stopId, idx) => {
			XHRGetRequest(`https://data.etagmb.gov.hk/stop/${stopId}`).then(individualStopJSON => {
				stopJSON[idx] = individualStopJSON;
				stopJSON[idx].data.lat = individualStopJSON.data.coordinates.wgs84.latitude
				stopJSON[idx].data.long = individualStopJSON.data.coordinates.wgs84.longitude

				XHRGetRequest(`https://data.etagmb.gov.hk/stop-route/${stopId}`).then(individualStopRouteJSON => {
					stopJSON[idx].data.name_en = individualStopRouteJSON.data[0].name_en;
					finished[idx] = true;
					oneFinished();
				});
			});
		});
	});
	return promise;
}

export default GetAllMinibusStopJSON;