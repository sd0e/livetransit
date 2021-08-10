import GetTimeFromTimestamp from "./GetTimeFromTimestamp";

const SortArrivalTimes = arr => {
	let newArr = new Array(arr.length);

	for (let idx = 0; idx < arr.length; idx++) {
		const arrivalData = arr[idx];
		const msUntilETA = GetTimeFromTimestamp(arrivalData.eta)[1];

		var newIndex = 0;

		for (let j = 0; j < arr.length; j++) {
			const jArrivalData = arr[j];
			const jMsUntilETA = GetTimeFromTimestamp(jArrivalData.eta)[1];

			if (msUntilETA > jMsUntilETA) {
				newIndex++;
			}
		}

		while (newArr[newIndex] !== undefined) {
			newIndex++;
		}

		newArr[newIndex] = arrivalData;
	}
	
	return newArr;
}

export default SortArrivalTimes;