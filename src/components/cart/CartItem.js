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
					className={classes['cart-item']}>
					<div className={classes.itemDescription}>
						<h3>{item.name}</h3>
						<p>x {item.amount}</p>
					</div>

					{/* CartItemForm */}
					<CartItemForm item={item} />

					{/* create a div with 2 buttons to add or remove this item from cart */}
					<div>
						<button
							className={classes.btnRemoveItem}
							onClick={() => {
								// props.onAddItem(item);
								props.onAddItemRedux(item);
							}}>
							+
						</button>
						<button
							className={classes.btnAddItem}
							onClick={() => {
								// props.onRemoveItem(item.id);
								props.onRemoveItemRedux(item.id);
							}}>
							-
						</button>
					</div>
				</div>
			))}
		</div>

		//
	);
};

export default CartItem;
