import GetUTCMilliseconds from "./GetUTCMilliseconds";

const GetTimeFromTimestamp = timestamp => {
	const currentUTCMilliseconds = new Date().getTime();
	const timestampUTCMilliseconds = GetUTCMilliseconds(timestamp);
	const differenceInMilliseconds = timestampUTCMilliseconds - currentUTCMilliseconds;
	if (differenceInMilliseconds > 60000) {
		return [`${new Date(differenceInMilliseconds).getUTCMinutes()} mins`, differenceInMilliseconds];
	} else if (differenceInMilliseconds > 0) {
		return [`${new Date(differenceInMilliseconds).getUTCSeconds()} secs`, differenceInMilliseconds];
	} else {
		return ['Now', differenceInMilliseconds];
	}
}

export default GetTimeFromTimestamp;