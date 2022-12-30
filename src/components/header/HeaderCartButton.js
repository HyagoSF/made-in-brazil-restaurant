import classes from './HeaderCartButton.module.css';
import HeaderCartIcon from './HeaderCartIcon';

const HeaderCartButton = () => {
	return (
		<button onClick={()=> {}} className={classes.button}>
			<HeaderCartIcon />
			<h1>Cart</h1>
            <span className={classes.totalItems}>5</span>
		</button>
	);
};

export default HeaderCartButton;
