import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import classes from './RouteMap.module.css';

const SetMapPosition = () => {
	const map = useMap();
	map.attributionControl._container.offsetParent.className = 'leaflet-top leaflet-right';
	return null;
}

function RouteMap(props) {
	const coordinates = props.Coordinates;

	return (
		<div className={classes.stopMapHolder}>
			<MapContainer zoom={12} center={coordinates[0]} scrollWheelZoom={true} className={classes.mapContainer}>
				<SetMapPosition />
				{/* Make attributions visible */}
				<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" position="topright" />
				{coordinates.map((coords, idx) => {
					return (
						<Marker position={coords} key={`marker${props.Ids[idx]}`}>
							<Popup key={`popup${props.Ids[idx]}`}>{`${idx + 1}: ${coords[2]}`}</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}

export default RouteMap;