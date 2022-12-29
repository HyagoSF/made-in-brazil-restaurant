import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';

import HeaderNavbar from './HeaderNavbar';

import HeaderTitle from './HeaderTitle';

const Header = () => {
	return (
		<div className={classes.header}>
			{/* title */}
            <HeaderTitle/>

			{/* Navigate Bar */}
			<HeaderNavbar/>

			{/* Cart */}
			<HeaderCartButton />
		</div>
	);
};

export default Header;
