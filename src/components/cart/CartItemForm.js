import classes from './CartItemForm.module.css';

const CartItemForm = (props) => {
	return (
		<div className={classes['cart-form']}>
			<p>Total Item</p>

			{/* this span is going to be a state */}
			<span>45.22</span>
		</div>
	);
};

export default CartItemForm;
