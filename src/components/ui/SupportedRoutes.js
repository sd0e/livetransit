import classes from './SupportedRoutes.module.css';
import RouteIcon from './RouteIcon';

const SupportedRoutes = () => {
	const supportedRoutes = ['KMB', 'Long Win Bus', 'Citybus', 'Cityflyer', 'NWFB', 'Green Minibus (HKI)', 'Green Minibus (KLN)', 'Green Minibus (NT)'];

	return (
		<div>
			<span className={classes.supportedRoutesTitle}>Supported Companies</span>
			<span className={classes.supportedRoutesHolder}>
				{supportedRoutes.map(company => <RouteIcon Company={company} Route={company} Margins="true" BoxShadow="true" key={`supported company ${company}`} />)}
			</span>
		</div>
	);
}

export default SupportedRoutes;