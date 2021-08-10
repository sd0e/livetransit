import classes from './Title.module.css';

function Title(props) {
	return (
		<div>
			<span className={classes.pageTitle}>{props.PageTitle}</span>
			{ props.PageSubtitle !== undefined ? <span className={classes.pageSubtitle}>{props.PageSubtitle}</span> : null }
		</div>
	);
}

export default Title;