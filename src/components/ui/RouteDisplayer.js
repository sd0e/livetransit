import classes from './RouteDisplayer.module.css';
import IsInNames from '../../scripts/IsInNames';

function RouteDisplayer(props) {
	let companyClass;

	let company = props.Company

	const isSpecialCompany = IsInNames(props.Route, company);
	
	if (isSpecialCompany === false) {
		switch (props.Company) {
			case 'Citybus': {
				companyClass = classes.Citybus;
				break;
			}
			case 'KMB': {
				companyClass = classes.KMB;
				break;
			}
			case 'NWFB': {
				companyClass = classes.NWFB;
				break;
			}
			case 'Green Minibus (NT)': {
				companyClass = classes.GMB;
				break;
			}
			case 'Green Minibus (KLN)': {
				companyClass = classes.GMB;
				break;
			}
			case 'Green Minibus (HKI)': {
				companyClass = classes.GMB;
				break;
			}
			default: {
				companyClass = classes.Default;
			}
		}
	} else {
		company = isSpecialCompany;

		switch (isSpecialCompany) {
			case 'Cityflyer': {
				companyClass = classes.Cityflyer;
				break;
			}
			case 'Cityflyer (Overnight)': {
				companyClass = classes.CityflyerOvernight;
				break;
			}
			case 'Long Win Bus': {
				companyClass = classes.LWB;
				break;
			}
			case 'Long Win Bus (Overnight)': {
				companyClass = classes.LWBOvernight;
				break;
			}
			default: {
				companyClass = classes.Default;
			}
		}
	}

	const displayText = company !== 'Default' ? company : 'Not Found' ;

	return (
		<div className={classes.routeHolder}>
			<span className={`${classes.routeText} ${companyClass}`}>{props.Route}</span>
			<span className={classes.routeCompany}>
				{ props.OverrideText !== undefined ? props.OverrideText : displayText }
			</span>
		</div>
	);
}

export default RouteDisplayer;