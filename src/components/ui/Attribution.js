import classes from './Attribution.module.css';

function Attribution(props) {
	return (
		<div>
			<span className={classes.attribution}>{props.Text}</span>
		</div>
	);
}

export default Attribution;