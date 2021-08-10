import classes from './RouteInput.module.css';

function RouteInput(props) {
	return (
		<div>
			<input type="text" placeholder={props.ExampleRoute} className={classes.routeInputTag} onChange={props.Update} autoFocus />
			<span className={classes.submitRouteButton} onClick={props.Click}>Go</span>
		</div>
	);
}

export default RouteInput;