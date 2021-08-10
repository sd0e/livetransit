import RouteDisplayer from './RouteDisplayer';

import classes from './ChooseCompany.module.css';

function ChooseCompany(props) {
	const companiesArray = props.Companies;

	return (
		<div>
			<span className={classes.chooseCompanyTitle}>Choose a company</span>
			<h4 className={classes.chooseCompanySubtitle}>Multiple companies operate this route.</h4>
			{companiesArray.map((el, idx) => {
				return (
					<div key={idx}>
						<button className={classes.routeButton} onClick={() => props.ClickFunction(el)}>
							<RouteDisplayer Route={props.Route} Company={el} />
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default ChooseCompany;