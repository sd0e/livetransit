import { Link } from 'react-router-dom';

import classes from './Navigation.module.css';

function Navigation() {
    return (
		<header className={classes.header}>
			<span className={classes.outerCircle}></span>
			<span className={classes.whiteCircle}></span>
			<span className={classes.pulsingCircle}></span>
			<span className={classes.headerTitle}>LiveTransit</span>
			<span className={classes.headerRegion}>HK</span>
		</header>
    );
}

export default Navigation;