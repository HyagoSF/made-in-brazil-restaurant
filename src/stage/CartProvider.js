import React, { useReducer } from 'react';
import CartContext from './cart-context.js';

function reducer(itemsState, action) {
	switch (action.type) {
		case 'ADD_ITEM_CART':
			// add item
			const newItemsArray = itemsState.concat(action.item);
			// console.log(newItemsArray);
			return newItemsArray;

		// if the item is already in the cart just add one to amount

		case 'REMOVE_ITEM_CART':
		// add item

		// if the item is already in the cart just remove one of the amount

		default:
			return itemsState;
	}
}

const CartProvider = (props) => {
	let initialItems = [
		{ id: 'i1', name: 'Coxinha', price: 8.25, amount: 1 },
		{ id: 'i2', name: 'Pao de Queijo', price: 8, amount: 2 },
	];

	const addItemToCartHandler = (item) => {
		// when I add an Item to cart, dispatch an action to execute the reducer function of add_item_cart
		// I'm passing all my items in the item property item, and to access it in my reducer is just call action.item
		dispatchAction({ type: 'ADD_ITEM_CART', item: item });
	};

	const removeItemOfCartHandler = (id) => {};

	const [itemsState, dispatchAction] = useReducer(reducer, initialItems);

	const cartContext = {
		items: itemsState,
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
