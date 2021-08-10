import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import classes from './StopMap.module.css';

const SetMapPosition = () => {
	const map = useMap();
	map.attributionControl._container.offsetParent.className = 'leaflet-top leaflet-right';
	return null;
}

function StopMap(props) {
	const coordinates = [props.Lat, props.Long];
	
	return (
		<div className={classes.stopMapHolder}>
			<MapContainer zoom={22} center={coordinates} scrollWheelZoom={true} className={classes.mapContainer}>
				<SetMapPosition />
				{/* Make attributions visible */}
				<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={coordinates}>
					<Popup>{props.StopName}</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

export default StopMap;