// import CartProvider from '../../stage/CartProvider';
import classes from './HeaderCartButton.module.css';
import HeaderCartIcon from './HeaderCartIcon';

import { useContext, useEffect, useState } from 'react';
import CartContext from '../../stage/cart-context';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/store/cart-slice';
import { useSelector } from 'react-redux';

const HeaderCartButton = (props) => {
	// const [bump, setBump] = useState(false);

	const bump = useSelector((state) => state.cart.cartItemsStates.bump);

	// const ctx = useContext(CartContext);

	const dispatch = useDispatch();

	const { cartItems: items } = useSelector((state) => state.cart);

	// const { items } = ctx; ////to extract all the items out of cartCtx, then I don't have to type cartCtx.items every time when I want those items

	const updatedTotalItems = items.reduce(
		// I start at 0, and for each item of the array I'll add the item.amount to my accumulator
		// I was summing up eachItem.amount this amount as a string, because when I use forward ref and get the .current.value it returns me a string
		(accumulator, eachItem) => accumulator + eachItem.amount,
		0
	);

	useEffect(() => {
		// do nothing if I don't have items yet
		if (items.length === 0) {
			return;
		}

		// if my updatedTotalItems change I'll set my bump to true
		dispatch(cartActions.setBump(true));
		// setBump(true);

		//and after 300ms I'll set this to false again
		const timer = setTimeout(() => {
			dispatch(cartActions.setBump(false));
			// setBump(false);
		}, 300);

		// then I'll clean my timeout to clear memory of my app
		return () => {
			clearTimeout(timer);
		};
	}, [updatedTotalItems]);

	return (
		<button
			onClick={props.onClick}
			className={`${classes.button} ${bump ? classes.bump : ''}`}>
			<HeaderCartIcon />
			<h1>Cart</h1>
			{/* showing the total Amount based on the cartContext totalAmount property */}
			<span className={classes.totalItems}>{updatedTotalItems}</span>
		</button>
	);
};

export default HeaderCartButton;

// import CartProvider from '../../stage/CartProvider';
// import classes from './HeaderCartButton.module.css';
// import HeaderCartIcon from './HeaderCartIcon';

// import { useContext } from 'react';
// import CartContext from '../../stage/cart-context';

// const HeaderCartButton = (props) => {
// 	const ctx = useContext(CartContext);

// 	const { items } = ctx; ////to extract all the items out of cartCtx, then I don't have to type cartCtx.items every time when I want those items

// 	const updatedTotalItems = items.reduce(
// 		// I start at 0, and for each item of the array I'll add the item.amount to my accumulator
// 		// I was summing up eachItem.amount this amount as a string, because when I use forward ref and get the .current.value it returns me a string
// 		(accumulator, eachItem) => accumulator + eachItem.amount,
// 		0
// 	);

// 	return (
// 		<button onClick={props.onClick} className={classes.button}>
// 			<HeaderCartIcon />
// 			<h1>Cart</h1>
// 			{/* showing the total Amount based on the cartContext totalAmount property */}
// 			<span className={classes.totalItems}>{updatedTotalItems}</span>
// 		</button>
// 	);
// };

// export default HeaderCartButton;
