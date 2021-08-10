import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './BusStop.module.css';
import BackButton from '../components/layout/BackButton';
import StopMap from '../components/ui/StopMap';
import ArrivalsTitle from '../components/ui/ArrivalsTitle';
import ArrivalsItem from '../components/ui/ArrivalsItem';
import Loading from '../components/layout/Loading';
import GetStopRouteETA from '../scripts/GetStopRouteETA';
import GetMinibusStopRouteETA from '../scripts/GetMinibusStopRouteETA';
import SortArrivalTimes from '../scripts/SortArrivalTimes';
import ObjIsEmpty from '../scripts/ObjIsEmpty';
import GetTimeFromTimestamp from '../scripts/GetTimeFromTimestamp';
import Capitalize from '../scripts/Capitalize';

function BusStop() {
	const updateFrequency = 20000; // In milliseconds

	const [stopData] = useState(window.stopInformation);
	const [isLoading, setIsLoading] = useState(true);
	const [arrivalTimes, setArrivalTimes] = useState([]);
	const [lastFetchMs, setLastFetchMs] = useState(0);

	let history = useHistory();

	const getArrivalTimes = () => {
		if (stopData.isMinibus !== true) {
			if (lastFetchMs === 0 || new Date().getTime() - lastFetchMs >= updateFrequency) {
				GetStopRouteETA(stopData.company, stopData.id, stopData.route).then(res => {
					let tempArrivalTimes = [];
					res.forEach(stopInfo => {
						tempArrivalTimes.push(stopInfo);
					});
					tempArrivalTimes = SortArrivalTimes(tempArrivalTimes);
					setArrivalTimes(tempArrivalTimes);
					if (ObjIsEmpty(tempArrivalTimes)) {
						clearInterval(window.refreshInterval);
					}
					setIsLoading(false);
				});
				setLastFetchMs(new Date().getTime());
			}
		} else {
			getMinibusArrivalTimes();
		}
	}

	const getMinibusArrivalTimes = () => {
		if (lastFetchMs === 0 || new Date().getTime() - lastFetchMs >= 20000) {
			GetMinibusStopRouteETA(stopData.id, stopData.minibusRoute).then(res => {
				let tempArrivalTimes = [];
				res.forEach((stopInfo, idx) => {
					tempArrivalTimes.push(stopInfo);
					tempArrivalTimes[idx].dest_en = stopData.destination;
					tempArrivalTimes[idx].eta = stopInfo.timestamp;
				});
				tempArrivalTimes = SortArrivalTimes(tempArrivalTimes);
				setArrivalTimes(tempArrivalTimes);
				if (ObjIsEmpty(tempArrivalTimes)) {
					clearInterval(window.refreshInterval);
				}
				setIsLoading(false);
			});
			setLastFetchMs(new Date().getTime());
		}
	}

	useEffect(() => {
		if (stopData !== undefined) {
			getArrivalTimes();
			window.refreshInterval = setInterval(getArrivalTimes, 500);
		}
	}, []);

	if (stopData === undefined) {
		history.push('/buses');
		return (
			<h1>No stop specified</h1>
		);
	} else {
		return (
			<div className={classes.noPadding}>
				<StopMap Lat={stopData.lat} Long={stopData.long} StopName={stopData.name} />
				<div className={classes.stopMapPadding}>
					<BackButton Text={stopData.route} Route={`/buses/stops#${stopData.route}`} />
					<ArrivalsTitle StopName={stopData.name} Route={stopData.route} Company={stopData.company} />

					{ !isLoading && stopData.isMinibus === true ? <span className={classes.minibusNotice}>Please note that these times have not been tested and may be incorrect.</span> : null }

					{/* Shows arrival times if the array isn't empty */}
					{ !ObjIsEmpty(arrivalTimes) ?
						arrivalTimes.map((arrivalTime, idx) => {
							return <ArrivalsItem Route={stopData.route} Company={stopData.company} Destination={Capitalize(arrivalTime.dest_en)} TimeUntilArrival={GetTimeFromTimestamp(arrivalTime.eta)[0]} key={`arrival${idx}`} />
						})
					:
						<div>
							{isLoading ? <Loading /> : <h3>No departures soon</h3>}
						</div>
					}
				</div>
			</div>
		);
	}
}

export default BusStop;