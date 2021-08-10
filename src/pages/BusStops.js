import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BackButton from '../components/layout/BackButton';
import RouteDisplayer from '../components/ui/RouteDisplayer';
import Loading from '../components/layout/Loading';
import ChooseCompany from '../components/ui/ChooseCompany';
import ChooseRoute from '../components/ui/ChooseRoute';
import DisplayStop from '../components/ui/DisplayStop';
import Subsection from '../components/ui/Subsection';
import MoreStops from '../components/ui/MoreStops';
import RouteMap from '../components/ui/RouteMap';
import GetBusCompany from '../scripts/GetBusCompany';
import GetRouteInfo from '../scripts/GetRouteInfo';
import GetMinibusRouteInfo from '../scripts/GetMinibusRouteInfo';
import GetRouteStops from '../scripts/GetRouteStops';
import GetMinibusRouteStops from '../scripts/GetMinibusRouteStops';
import GetAllStopJSON from '../scripts/GetAllStopJSON';
import GetAllMinibusStopJSON from '../scripts/GetAllMinibusStopJSON';
import Capitalize from '../scripts/Capitalize';
import objIsEmpty from '../scripts/ObjIsEmpty';
function useUpdatePage() {
	const [, setValue] = useState(0);
	return () => setValue(value => value + 1);
}

function BusStops() {
	const [isLoading, setIsLoading] = useState(true);
	const [company, setCompany] = useState('Default');
	const [areMultipleCompanies, setAreMultipleCompanies] = useState([false]);
	const [routeFound, setRouteFound] = useState(true);
	const [stopInfo, setStopInfo] = useState([]);
	const [stopIds, setStopIds] = useState([]);
	const [stopJSON, setStopJSON] = useState([]);
	const [notShownStops, setNotShownStops] = useState(0);
	const [allShown, setAllShown] = useState(false);
	const [isLoadingStops, setIsLoadingStops] = useState(false);
	const [areMultipleRoutes, setAreMultipleRoutes] = useState([false]);
	const [isMinibus, setIsMinibus] = useState(false);
	const [stopInfoAvailable, setStopInfoAvailable] = useState(true);
	const [coords, setCoords] = useState([]);
	const [minibusRouteId, setMinibusRouteId] = useState(0);

	const forceUpdate = useUpdatePage();

	window.clearInterval(window.refreshInterval);

	let history = useHistory();

	// Go to the buses index if a route is not defined (i.e. if the user went straight to /buses/stops)
	const fetchHashRoute = () => {
		if (window.location.hash === '') {
			history.push('/buses');
		} else {
			window.route = window.location.hash.substring(1).toUpperCase();
		}
	}

	fetchHashRoute();

	const updatePageTitle = () => {
		document.title = `${window.route} | Buses | LiveTransit HK`;
	}

	updatePageTitle();

	const triggerLoad = () => {
		setIsLoading(true);
		GetBusCompany(window.route).then(res => {
			if (res.length === 1) {
				setCompany(res[0]);
				companyUpdated(res[0]);
				if (res[0] === 'Default') {
					setRouteFound(false);
				} else {
					setRouteFound(true);
				}
			} else {
				setAreMultipleCompanies(res);
				setIsLoading(false);
			}
		});
	}

	useEffect(() => {
		triggerLoad();
	}, []);

	window.addEventListener('hashchange', () => {
		const currentTime = new Date().getTime();
		// When the URL changes.
		if (window.lastHashChange === undefined || currentTime - window.lastHashChange > 200) {
			window.lastHashChange = currentTime;
			fetchHashRoute();
			updatePageTitle();
			forceUpdate();
			triggerLoad();
		}
	});

	const chosenCompany = company => {
		setCompany(company);
		companyUpdated(company);
		setAreMultipleCompanies([false]);
		setRouteFound(true);
	}

	// Triggers every time a company is set, and grabs stop data
	const companyUpdated = updatedCompany => {
		setStopIds([]);
		setStopInfoAvailable(false);
		if (updatedCompany !== 'Default') {
			if (!updatedCompany.includes('Green Minibus')) {
				// Not a minibus
				setIsLoading(true);
				setIsMinibus(false);
				setAllShown(false);
				GetRouteInfo(window.route, updatedCompany).then(res => {
					let origin = res.data.orig_en;
					let destination = res.data.dest_en;
					if (updatedCompany === 'KMB') {
						origin = Capitalize(origin);
						destination = Capitalize(destination);
					}
					setStopInfo([origin, destination]);
					GetRouteStops(window.route, updatedCompany).then(stopRes => {
						if (stopRes !== -1) {
							// Stop data available
							setNotShownStops(stopRes.length - 2);
							let stopIdArray = [];
							stopRes.forEach(stop => {
								stopIdArray.push(stop.stop);
							});
							setStopIds(stopIdArray);
							setStopInfoAvailable(true);
							setIsLoading(false);
						} else {
							setStopInfoAvailable(false);
							setIsLoading(false);
						}
					});
				});
			} else {
				// A minibus
				setStopInfoAvailable(true);
				setIsLoading(true);
				setIsMinibus(true);
				setAllShown(false);
				GetRouteInfo(window.route, updatedCompany).then(res => {
					if (res.data.length === 1) {
						const routeId = res.data[0].route_id;
						setMinibusRouteId(routeId);
						setMinibusRoute(routeId);
					} else {
						setAreMultipleRoutes(res.data);
						setIsLoading(false);
					}
				});
			}
		}
	}

	const setMinibusRoute = routeId => {
		setAreMultipleRoutes([false]);
		setIsLoading(true);
		GetMinibusRouteInfo(routeId).then(info => {
			const origin = info.directions[0].orig_en;
			const destination = info.directions[0].dest_en;
			setStopInfo([origin, destination]);
			GetMinibusRouteStops(routeId).then(stopRes => {
				setNotShownStops(stopRes.length - 2);
				let stopIdArray = [];
				stopRes.forEach(stop => {
					stopIdArray.push(stop.stop_id);
				});
				setStopIds(stopIdArray);
				setIsLoading(false);
			});
		});
	}

	useEffect(() => {
		if (isLoading === false && allShown === false) {
			loadAllStops();
		}
	}, [allShown, isLoading]);

	const loadAllStops = () => {
		if (stopInfoAvailable === true) {
			if (isMinibus) {
				loadAllStopsMinibus();
			} else {
				setAllShown(false);
				setIsLoadingStops(true);
				GetAllStopJSON(stopIds, company).then(res => {
					let tempCoords = [];
					res.forEach(stopInfoTemp => tempCoords.push([stopInfoTemp.data.lat, stopInfoTemp.data.long, stopInfoTemp.data.name_en]));
					setCoords(tempCoords);
					setIsLoadingStops(false);
					setStopJSON(res);
					setAllShown(true);
				});
			}
		}
	}

	const loadAllStopsMinibus = () => {
		setAllShown(false);
		setIsLoadingStops(true);
		GetAllMinibusStopJSON(stopIds).then(res => {
			let tempCoords = [];
			res.forEach(stopInfoTemp => tempCoords.push([stopInfoTemp.data.lat, stopInfoTemp.data.long, stopInfoTemp.data.name_en]));
			setCoords(tempCoords);
			setIsLoadingStops(false);
			setStopJSON(res);
			setAllShown(true);
		});
	}

	const targetedCapitalization = (str, company) => {
		if (company === 'KMB') {
			return Capitalize(str);
		} else {
			return str;
		}
	}

	window.targetedCapitalization = targetedCapitalization;

	const goToStop = idx => {
		const tempStopInfo = stopJSON[idx];
		const stopId = stopIds[idx];
		const stopCompany = company;
		const stopRoute = window.route;
		let name = tempStopInfo.data.name_en;
		if (stopCompany === 'KMB') {
			name = Capitalize(name);
		}
		window.stopInformation = {
			id: stopId,
			company: stopCompany,
			route: stopRoute,
			name: name,
			lat: tempStopInfo.data.lat,
			long: tempStopInfo.data.long,
			isMinibus: isMinibus,
			minibusRoute: minibusRouteId,
			destination: stopInfo[1]
		};
		history.push('/buses/stop');
	}

	return (
		<div>
			<BackButton Route="/buses" />
			{isLoading === false && areMultipleCompanies[0] === false && areMultipleRoutes[0] === false ? <RouteDisplayer Company={company} Route={window.route} /> : null}
			{isLoading ? <Loading /> : null}
			{areMultipleCompanies[0] !== false && isLoading === false ? <ChooseCompany Companies={areMultipleCompanies} Route={window.route} ClickFunction={chosenCompany} /> : null}
			{areMultipleRoutes[0] !== false && isLoading === false ? <ChooseRoute Routes={areMultipleRoutes} Route={window.route} ClickFunction={setMinibusRoute} /> : null}
			{isLoading === false && areMultipleCompanies[0] === false && areMultipleRoutes[0] === false && routeFound === true ?
				<Subsection Subtitle="Stops">
					{!objIsEmpty(coords) && !isLoading ? <RouteMap Coordinates={coords} Ids={stopIds} /> : null}
					{allShown ?
						<div>
							{stopJSON.map((json, idx) => {
								return <DisplayStop StopName={targetedCapitalization(json.data.name_en, company)} Number={idx + 1} StopId={stopIds[idx]} key={stopIds[idx]} Click={() => goToStop(idx)} />;
							})}
						</div>
						:
						<div>
							<DisplayStop StopName={stopInfo[0]} Number="Origin" />
							<MoreStops OverrideText={ stopInfoAvailable ? null : 'Stop information not available' } Number={ notShownStops } ClickFunction={ stopInfoAvailable ? loadAllStops : undefined } IsLoading={isLoadingStops ? true : false} />
							<DisplayStop StopName={stopInfo[1]} Number="Destination" />
						</div>
					}
				</Subsection>
				: null}
		</div>
	);
}

export default BusStops;