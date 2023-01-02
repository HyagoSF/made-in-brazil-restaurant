import classes from './CartItemForm.module.css';

const CartItemForm = (props) => {
	let totalItemAmount = props.item.price * props.item.amount;
	// +totalItemAmount;

	return (
		<div className={classes['cart-form']}>
			<p>Total Item</p>

			{/* this span is going to be a state */}
			<span>{totalItemAmount}</span>
		</div>
	);
};

export default CartItemForm;
