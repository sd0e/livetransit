import { AddCircleOutline } from '@material-ui/icons';

import loading from '../../assets/loading.gif';
import classes from './MoreStops.module.css';

function MoreStops(props) {
	return (
		<div>
			{ props.OverrideText === null ?
				<button className={classes.moreStopsButton} onClick={props.ClickFunction}>
					{ props.IsLoading === true ?
						<img src={loading} alt="Loading..." className={classes.loadingGif} />
					:
						<AddCircleOutline className={classes.moreStopsIcon} />
					}
					<span className={classes.moreStopsText}>{props.Number} More</span>
				</button>
			:
				<span className={classes.overrideText}>{props.OverrideText}</span>
			}
		</div>
	)
}

export default MoreStops;