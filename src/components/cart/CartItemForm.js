import classes from './CartItemForm.module.css';

const CartItemForm = (props) => {
	let totalItemAmount = props.item.price * props.item.amount;

	let totalItemAmount2Decimals = totalItemAmount.toFixed(2);

	return (
		<div className={classes['cart-form']}>
			<p>Total Item</p>

			{/* this span is going to be a state */}
			<span>{totalItemAmount2Decimals}</span>
		</div>
	);
};

export default CartItemForm;
