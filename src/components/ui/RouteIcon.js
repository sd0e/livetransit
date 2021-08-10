import classes from './RouteIcon.module.css';
import IsInNames from '../../scripts/IsInNames';

const RouteIcon = props => {
	let companyClass;

	let company = props.Company;

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

	if (props.Route === 'Cityflyer') {
		companyClass = classes.Cityflyer;
	} else if (props.Route === 'Long Win Bus') {
		companyClass = classes.LWB;
	}

	const margins = props.Margins !== undefined ? classes.margins : null;
	const boxShadow = props.BoxShadow !== undefined ? classes.boxShadow : null;

	return (
		<span className={companyClass + ' ' + classes.routeOuter + ' ' + boxShadow + ' ' + margins}>{props.Route}</span>
	);
}

export default RouteIcon;