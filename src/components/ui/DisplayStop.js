import classes from './DisplayStop.module.css';

function DisplayStop(props) {
	return (
		<div>
			{
				props.Click !== undefined ?
					<button key={props.Number} className={classes.stopHolderButton} onClick={props.Click}>
						<span className={classes.stopNumber}>{props.Number}</span>
						<span className={classes.stopName}>{props.StopName}</span>
					</button>
				:
					<div key={props.Number} className={classes.stopHolder}>
						<span className={classes.stopNumber}>{props.Number}</span>
						<span className={classes.stopName}>{props.StopName}</span>
					</div>
				}
		</div>
	)
}

export default DisplayStop;