import classes from './CartItem.module.css';

import CartItemForm from './CartItemForm';

const CartItem = (props) => {
	return (
		<div>
			<div className={classes['cart-item']}>
				<div>
					<h3>Item Name</h3>

					{/* amount */}
					<p>x 3</p>
				</div>

				{/* CartItemForm */}
				<CartItemForm />
			</div>
		</div>

        // 
	);
};

export default CartItem;
