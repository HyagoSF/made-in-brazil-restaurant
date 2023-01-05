// import CartProvider from '../../stage/CartProvider';
import classes from './HeaderCartButton.module.css';
import HeaderCartIcon from './HeaderCartIcon';

import { useContext } from 'react';
import CartContext from '../../stage/cart-context';

const HeaderCartButton = (props) => {
	const ctx = useContext(CartContext);

	const { items } = ctx; ////to extract all the items out of cartCtx, then I don't have to type cartCtx.items every time when I want those items

	console.log(items);

	const updatedTotalItems = items.reduce(
		// I start at 0, and for each item of the array I'll add the item.amount to my accumulator
		// I was summing up eachItem.amount this amount as a string, because when I use forward ref and get the .current.value it returns me a string
		(accumulator, eachItem) => accumulator + eachItem.amount,
		0
	);

	return (
		<button onClick={props.onClick} className={classes.button}>
			<HeaderCartIcon />
			<h1>Cart</h1>
			{/* showing the total Amount based on the cartContext totalAmount property */}
			<span className={classes.totalItems}>{updatedTotalItems}</span>
		</button>
	);
};

export default HeaderCartButton;
