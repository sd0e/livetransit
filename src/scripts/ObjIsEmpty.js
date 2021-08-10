const objIsEmpty = obj => {
	if (Array.isArray(obj)) {
		// Object which is an array
		return obj.length === 0;
	} else {
		// Object which isn't an array
		return obj && obj.constructor === Object && Object.keys(obj).length === 0;
	}
}

export default objIsEmpty;