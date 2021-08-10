import XHRGetRequest from './XHRGetRequest';
import ObjIsEmpty from './ObjIsEmpty';

const allFinished = arr => {
	for (let idx = 0; idx < arr.length; idx++) {
		const el = arr[idx];
		if (el !== true) {
			return false;
		}
	}
	return true;
}

const GetBusCompany = route => {
	const promise = new Promise((resolve, reject) => {
		let resolveData = [];
		let finished = new Array(6);

		const oneFinished = () => {
			if (allFinished(finished)) {
				if (resolveData.length === 0) {
					resolveData.push('Default');
				}
				
				resolve(resolveData);
			}
		}

		// Check if data is from KMB
		XHRGetRequest(`https://data.etabus.gov.hk/v1/transport/kmb/route/${route}/outbound/1`).then(res => {
			const data = res.data;
			if (!ObjIsEmpty(data)) {
				resolveData.push('KMB');
			}
			
			finished[0] = true;
			oneFinished();
		});

		// Check if data is from Citybus
		XHRGetRequest(`https://rt.data.gov.hk/v1/transport/citybus-nwfb/route/CTB/${route}`).then(res => {
			const data = res.data;
			if (!ObjIsEmpty(data)) {
				resolveData.push('Citybus');
			}

			finished[1] = true;
			oneFinished();
		});

		// Check if data is from NWFB
		XHRGetRequest(`https://rt.data.gov.hk/v1/transport/citybus-nwfb/route/NWFB/${route}`).then(res => {
			const data = res.data;
			if (!ObjIsEmpty(data)) {
				resolveData.push('NWFB');
			}

			finished[2] = true;
			oneFinished();
		});

		// Check if data is from a New Territories green minibus
		XHRGetRequest(`https://data.etagmb.gov.hk/route/NT/${route}`).then(res => {
			const data = res.data;
			if (!ObjIsEmpty(data)) {
				resolveData.push('Green Minibus (NT)');
			}

			finished[3] = true;
			oneFinished();
		});

		// Check if data is from a Kowloon green minibus
		XHRGetRequest(`https://data.etagmb.gov.hk/route/KLN/${route}`).then(res => {
			const data = res.data;
			if (!ObjIsEmpty(data)) {
				resolveData.push('Green Minibus (KLN)');
			}

			finished[4] = true;
			oneFinished();
		});

		// Check if data is from a Hong Kong Island green minibus
		XHRGetRequest(`https://data.etagmb.gov.hk/route/HKI/${route}`).then(res => {
			const data = res.data;
			if (!ObjIsEmpty(data)) {
				resolveData.push('Green Minibus (HKI)');
			}

			finished[5] = true;
			oneFinished();
		});
	});
	return promise;
}

export default GetBusCompany;