import Names from '../data/Names';

const IsInNames = (route, company) => {
	const namesArray = Object.keys(Names);
	for (let i = 0; i < namesArray.length; i++) {
		const routeType = namesArray[i];
		const routeOperator = Names[routeType][0];
		if (routeOperator === company) {
			const routeOperatorRoutes = Names[routeType][1];
			for (let j = 0; j < routeOperatorRoutes.length; j++) {
				const routeNumber = routeOperatorRoutes[j];
				if (routeNumber === route) {
					return routeType;
				};
			}
		}
	}
	return false;
}

export default IsInNames;