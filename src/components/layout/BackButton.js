import { Link } from 'react-router-dom';

import { ArrowBack } from '@material-ui/icons';

import classes from './BackButton.module.css';

function BackButton(props) {
	let text = props.Text;
	if (text === undefined) {
		text = 'Back';
	}

	return (
		<div>
			<Link to={props.Route} className={classes.backButtonHolder}>
				<ArrowBack className={classes.backButtonIcon} />
				<span className={classes.backButtonText}>{text}</span>
			</Link>
		</div>
	)
}

export default BackButton;