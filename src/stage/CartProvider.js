import React from 'react';
import CartContext from './cart-context.js';

const CartProvider = (props) => {
	const addItemToCartHandler = (item) => {
		// I'm trying to make this works, but until now it didn't work yet
		// const newItemsArray = CartContext.items.concat({...items, item: item } );
	};

	const removeItemOfCartHandler = (id) => {};

	const cartContext = {
		items: [
			{ id: 'i1', name: 'Coxinha', price: 8.25, amount: 6 },
			{ id: 'i2', name: 'Pao de Queijo', price: 6.5, amount: 2 },
		],
		totalAmount: 0,
		addItem: addItemToCartHandler,
		removeItem: removeItemOfCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
