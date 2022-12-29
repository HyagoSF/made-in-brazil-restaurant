import classes from './HeaderNavbar.module.css';

const HeaderNavbar = () => {
	return (
		<ul className={classes.navbarList}>
			<li>
				<a href="#">Home</a>
			</li>
			<li>
				<a href="#">Meals</a>
			</li>
			<li>
				<a href="#">About us</a>
			</li>
		</ul>
	);
};

export default HeaderNavbar;
