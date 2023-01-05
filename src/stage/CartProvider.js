import React, { useReducer } from 'react';
import CartContext from './cart-context.js';

const initialItems = {
	items: [],
	totalAmount: 0,
};

function reducer(itemsState, action) {
	switch (action.type) {
		case 'ADD_ITEM_CART':
			// add some validation here to see if I already have the item.name inside the ctx, and if I do, I should just change the amount of it, instead of just adding more item

			// const newItemsList = [...ctx.items, amount: amount];

			// itemsState.map((item)=> {
			// 	if (props.id === item.id){

			// 	}
			// })

			// in itemsState is there some element where the element.id is the same as the action.id element I'm trying to add into my current state(My items)
			// const found = itemsState.some((el) => el.id == action.item.id);
			// console.log(found);

			const existingCartItemIndex = itemsState.items.findIndex(
				(item) => item.id === action.item.id
			);

			const existingCartItem = itemsState.items[existingCartItemIndex];

			console.log(existingCartItemIndex);

			// const testing1 = itemsState.items.map((el) => el.key);

			// console.log('found: ' + found);
			// console.log('element.id: ' + testing1);
			// console.log('Item I want to add key: ' + action.item.key);

			// const newItemsArrayIfItemFound;

			// variables that will be useful
			let updatedItem;
			let updatedItems;

			// if the item is not in the cart yet
			if (existingCartItem) {
				// if the item is already in the cart go through it using .map() and then update the amount value to the new one

				updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount,
				};

				updatedItems = [...itemsState.items];

				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				// add item

				//copy the properties of my action.item, and save it in my updatedItem
				updatedItem = { ...action.item };

				// than concat it in my state
				updatedItems = itemsState.items.concat(updatedItem);

				// itemsState.items.concat(...action.item);
				// console.log('Item not found');
				// return newItemsArray;
			}

			return { items: updatedItem, totalAmount: 0 };
		// return itemsState.items;

		// if the item is already in the cart just add one to amount

		// case 'REMOVE_ITEM_CART':
		// add item

		// if the item is already in the cart just remove one of the amount
		default:
			return { items: itemsState, totalAmount: 0 };
	}
}

const CartProvider = (props) => {
	const addItemToCartHandler = (item) => {
		// when I add an Item to cart, dispatch an action to execute the reducer function of add_item_cart
		// I'm passing all my items in the item property item, and to access it in my reducer is just call action.item
		dispatchAction({ type: 'ADD_ITEM_CART', item: item });
	};

	const removeItemOfCartHandler = (id) => {};

	const [cartState, dispatchAction] = useReducer(reducer, initialItems);

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
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
