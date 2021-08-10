const XHRGetRequest = url => {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);

		xhr.responseType = 'json';

		xhr.onload = () => {
			resolve(xhr.response);
		}

		xhr.onerror = () => {
			reject(xhr.response);
		}

		xhr.send();
	});
	return promise;
}

export default XHRGetRequest;