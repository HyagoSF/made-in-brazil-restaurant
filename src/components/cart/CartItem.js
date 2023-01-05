import classes from './CartItem.module.css';

import CartItemForm from './CartItemForm';

const CartItem = (props) => {
	const items = props.cartItems;

	const generateKey = (pre) => {
		return `${pre}_${new Date().getTime()}`;
	};

	return (
		<div>
			{items.map((item) => (
				<div
					key={generateKey(item.name)}
					onClick={() => {
						props.onRemoveItem(item.id);
					}}
					className={classes['cart-item']}>
					<div>
						<h3>{item.name}</h3>
						<p>x {item.amount}</p>
					</div>

					{/* CartItemForm */}
					<CartItemForm item={item} />
				</div>
			))}
		</div>

		//
	);
};

export default CartItem;
