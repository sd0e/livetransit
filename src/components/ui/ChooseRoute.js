import RouteDisplayer from './RouteDisplayer';

import classes from './ChooseRoute.module.css';

function ChooseRoute(props) {
	const routesArray = props.Routes;

	return (
		<div>
			<span className={classes.chooseCompanyTitle}>Choose a route</span>
			<h4 className={classes.chooseCompanySubtitle}>This route operates with different paths.</h4>
			{routesArray.map(el => {
				return (
					<div key={el.route_id}>
						<button className={classes.routeButton} onClick={() => props.ClickFunction(el.route_id)}>
							<RouteDisplayer Route={props.Route} Company="Green Minibus (HKI)" OverrideText={el.description_en} />
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default ChooseRoute;