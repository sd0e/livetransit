import classes from './ArrivalsTitle.module.css';
import RouteIcon from './RouteIcon';

function ArrivalsTitle(props) {
	return (
		<div>
			<span className={classes.arrivalsTitleName}>{props.StopName}</span>
			<span className={classes.arrivalsTitleText}>
				Live
				<RouteIcon Route={props.Route} Company={props.Company} BoxShadow="true" Margins="true" />
				Arrivals
			</span>
		</div>
	);
}

export default ArrivalsTitle