// import CartProvider from '../../stage/CartProvider';
import classes from './HeaderCartButton.module.css';
import HeaderCartIcon from './HeaderCartIcon';

import { useContext } from 'react';
import CartContext from '../../stage/cart-context';

const HeaderCartButton = (props) => {
	const ctx = useContext(CartContext);

	const totalItemsInTheCart = ctx.items.reduce(
		// I start at 0, and for each item of the array I'll add the item.amount to my accumulator
		(totalAmount, item) => totalAmount + item.amount,
		0
	);

	return (
		<button onClick={props.onClick} className={classes.button}>
			<HeaderCartIcon />
			<h1>Cart</h1>
			{/* showing the total Amount based on the cartContext totalAmount property */}
			<span className={classes.totalItems}>{totalItemsInTheCart}</span>
		</button>
	);
};

export default HeaderCartButton;
