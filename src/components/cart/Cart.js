import { useState } from 'react';
import { useContext } from 'react';
import CartContext from '../../stage/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import Checkout from './Checkout';

const Cart = (props) => {
	const ctx = useContext(CartContext);

	const [isCheckout, setIsCheckout] = useState(false);

	const { items, totalAmount } = ctx;

	const totalAmountFixed = totalAmount.toFixed(2);

	// to show the form just if I do have items in my cart
	const showForm = () => {
		if (items.length > 0) {
			return <Checkout onCancel={props.onClick} />;
		}
	};

	const modalActions = (
		<div className={classes.totalAmount}>
			<button onClick={props.onClick} className={classes.btnClose}>
				Close
			</button>
			<button
				className={classes.btnOrder}
				onClick={() => {
					setIsCheckout(true);
				}}>
				Order
			</button>
		</div>
	);

	return (
		<div className={classes['cart-content']}>
			<h1 className={classes.title}>My Cart</h1>

			{/* CartItem and form inside it*/}
			<CartItem onRemoveItem={ctx.removeItem} cartItems={items} />

			{/* Total Amount */}
			<div className={classes.totalAmount}>
				Total: $
				<span className={classes.totalAmountValue}>
					{totalAmountFixed}
				</span>
			</div>

			{/* if press the order btn show the form */}
			{isCheckout && showForm()}
			{/* if not just show the buttons to close and to order */}
			{!isCheckout && modalActions}
		</div>
	);
};

export default Cart;
