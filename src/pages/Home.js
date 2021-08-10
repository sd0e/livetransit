import { Link } from 'react-router-dom';

import Title from '../components/layout/Title';

function Buses() {
	document.title = `LiveTransit HK`;
	
	window.clearInterval(window.refreshInterval);

	return (
		<div>
			<Title PageTitle="Live Transit Tracking" PageSubtitle="Track bus and minibus routes live." />
			<Link to="/buses">Live Bus Tracking</Link>
		</div>
	);
}

export default Buses;