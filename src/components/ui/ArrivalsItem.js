import classes from './ArrivalsItem.module.css';
import RouteIcon from './RouteIcon';

const ArrivalsItem = props => {
	return (
		<div className={classes.arrivalsItemHolder}>
			<RouteIcon Route={props.Route} Company={props.Company} className={classes.routeIcon} />
			<span className={classes.destination}>{props.Destination}</span>
			<span className={classes.timeUntilArrival}>{props.TimeUntilArrival}</span>
		</div>
	);
}

export default ArrivalsItem;