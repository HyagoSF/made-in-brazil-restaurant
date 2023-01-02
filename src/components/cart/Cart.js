import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	return (
		<div className={classes['cart-content']}>
			<h1 className={classes.title}>My Cart</h1>

			{/* CartItem and form inside it*/}
			<CartItem />

			{/* Total Amount */}
			<div className={classes.totalAmount}>
				<div>
					Total: $
					<span className={classes.totalAmountValue}>0.00</span>
				</div>

				<div>
					<button onClick={props.onClick} className={classes.btnClose}>Close</button>
					<button className={classes.btnOrder}>Order</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
