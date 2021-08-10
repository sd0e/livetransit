import classes from './Loading.module.css';
import loading from '../../assets/loading.gif';

function Loading() {
	return (
		<div>
			<img src={loading} alt="Loading..." className={classes.loadingIcon} />
			<span className={classes.loadingText}>Loading...</span>
		</div>
	)
}

export default Loading;