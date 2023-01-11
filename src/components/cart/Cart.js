import { useContext } from 'react';
import CartContext from '../../stage/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	const ctx = useContext(CartContext);

	const { items, totalAmount } = ctx;

	const totalAmountFixed = totalAmount.toFixed(2);

	return (
		<div className={classes['cart-content']}>
			<h1 className={classes.title}>My Cart</h1>

			{/* CartItem and form inside it*/}
			<CartItem onRemoveItem={ctx.removeItem} cartItems={items} />

			{/* Total Amount */}
			<div className={classes.totalAmount}>
				<div>
					Total: $
					<span className={classes.totalAmountValue}>
						{totalAmountFixed}
					</span>
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
