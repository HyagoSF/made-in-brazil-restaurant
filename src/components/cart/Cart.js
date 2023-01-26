import { useState } from 'react';
import { useContext } from 'react';
import CartContext from '../../stage/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import axios from 'axios';

import Checkout from './Checkout';

const Cart = (props) => {
	const ctx = useContext(CartContext);

	const [isCheckout, setIsCheckout] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const { items, totalAmount, clearCart } = ctx;

	const totalAmountFixed = totalAmount.toFixed(2);

	// to show the form just if I do have items in my cart
	const showForm = () => {
		if (items.length > 0) {
			return (
				<Checkout
					onSubmitOrder={submitOrderHandler}
					onCancel={props.onClick}
				/>
			);
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

	const submitOrderHandler = (userData) => {
		setIsSubmitting(true);

		const orderData = {
			userData,
			mealsOfTheOrder: items,
		};

		axios
			.post(
				'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/orders.json',
				orderData
			)
			.then(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			);

		setIsSubmitting(false);
		setDidSubmit(true);

		// To clear the cart after the order
		clearCart();
	};

	/**
	 * Separating my content in different variables to make it easy to rerender them, depending on the state
	 */
	const cartModalContent = (
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

	const isSubmittingModal = (
		<div className={classes.isSubmitting}>
			<p className={classes.isSubmittingText}>Sending order data...</p>
		</div>
	);

	const isSubmitted = (
		<div className={classes.isSubmitted}>
			<p className={classes.isSubmittedText}>Successfully sent the order</p>
		</div>
	);

	return (
		<>
			{/* if isSubmitting is true, show the isSubmittingModalContent */}
			{isSubmitting && isSubmittingModal}

			{/* if isSubmitting is false and didSubmit is true, show the isSubmittedContent */}
			{!isSubmitting && didSubmit && isSubmitted}

			{/* if isSubmitting is false and didSubmit is false, show the cartModalContent */}
			{!isSubmitting && !didSubmit && cartModalContent}
		</>
	);
};

export default Cart;
