import { useContext } from 'react';
import CartContext from '../../stage/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	const ctx = useContext(CartContext);

	// const DUMMY_CART_ITEMS = [
	// 	{ id: 'i1', name: 'Coxinha', price: 8.25, amount: 3},
	// 	{ id: 'i2', name: 'Pao de Queijo', price: 6.5, amount: 2 },
	// ];

	return (
		<div className={classes['cart-content']}>
			<h1 className={classes.title}>My Cart</h1>

			{/* CartItem and form inside it*/}
			<CartItem cartItems={ctx.items}/>

			{/* Total Amount */}
			<div className={classes.totalAmount}>
				<div>
					Total: $
					<span className={classes.totalAmountValue}>0.00</span>
				</div>

				<div>
					<button
						onClick={props.onClick}
						className={classes.btnClose}>
						Close
					</button>
					<button className={classes.btnOrder}>Order</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
