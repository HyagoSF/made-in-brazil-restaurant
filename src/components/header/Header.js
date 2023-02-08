import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';

import HeaderNavbar from './HeaderNavbar';

import HeaderTitle from './HeaderTitle';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import uiActions from '../../redux/store/ui-slice.jsx';
import { uiActions } from '../../redux/store/ui-slice.jsx';

const Header = (props) => {
	const dispatch = useDispatch();
	const uiSlice = useSelector((state) => state.ui);

	// console.log(uiActions.login);
	const toggleLogin = () => {
		dispatch(uiActions.toggleLogin());
	};

	return (
		<div className={classes.header}>
			{/* title */}
			<HeaderTitle />

			{/* Cart */}
			{uiSlice.isLoggedIn && (
				<div className={classes.logged}>
					{/* Navigate Bar */}
					{/* <HeaderNavbar /> */}

					<HeaderCartButton onClick={props.onClick} />
					<button className={classes.logoutBtn} onClick={toggleLogin}>
						Logout
					</button>
				</div>
			)}

			{!uiSlice.isLoggedIn && (
				<button className={classes.loginBtn} onClick={toggleLogin}>
					Login
				</button>
			)}
		</div>
	);
};

export default Header;
