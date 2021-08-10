import classes from './Subsection.module.css';

function Subsection(props) {
	return (
		<div className={classes.stopDisplayerHolder}>
			<span className={classes.stopDisplayerSubtitle}>{props.Subtitle}</span>
			<div>{props.children}</div>
		</div>
	);
}

export default Subsection;