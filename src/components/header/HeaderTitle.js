import classes from './HeaderTitle.module.css';

const HeaderTitle = () => {
	return <h1>
        <span className={classes.one}>Made</span>
        <span className={classes.two}>In</span>
        <span className={classes.three}>Brasil</span>
    </h1>
};

export default HeaderTitle;
