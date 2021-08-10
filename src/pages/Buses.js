import { useHistory } from 'react-router-dom';

import Title from '../components/layout/Title';
import RouteInput from '../components/ui/RouteInput';
import SupportedRoutes from '../components/ui/SupportedRoutes';
import Attribution from '../components/ui/Attribution';

function Buses() {
	document.title = `Buses | LiveTransit HK`;
	
	window.clearInterval(window.refreshInterval);

	const exampleRoute = '40';

	let history = useHistory();

	function loadStops() {
		if (window.route === undefined || window.route === '') {
			// No user input
			window.route = exampleRoute;
		}
		history.push('/buses/stops#' + window.route);
	}

	function updateRoute(props) {
		let value = props.target.value.trim();
		if (value !== '') {
			window.route = value;
		}
	}

	return (
		<div>
			<Title PageTitle="Live Bus Timetables" PageSubtitle="Enter a route number to see stops and live arrival times of both buses and minibuses." />
			<RouteInput ExampleRoute={window.route === undefined ? exampleRoute : window.route} Click={loadStops} Update={updateRoute.bind(this)} />
			<SupportedRoutes />
			<Attribution Text="Data courtesy of Citybus Limited, New World First Bus Services Limited, The Kowloon Motor Bus Company and the Government of Hong Kong." />
		</div>
	);
}

export default Buses;