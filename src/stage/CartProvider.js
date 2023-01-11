import React, { useReducer, useState, useCallback, useEffect } from 'react';
import CartContext from './cart-context.js';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const DUMMY_MEALS = [
	{
		id: 'i1',
		name: 'Coxinha',
		description:
			'Chicken pastries with aioli, a classic Brazilian street food',
		price: 8.25,
	},
	{
		id: 'i2',
		name: 'Pao de Queijo',
		description: 'Brazilian mini cheese breads',
		price: 6.5,
	},
	{
		id: 'i3',
		name: 'Mandioca Frita',
		description: 'Cassava chips served with alioli',
		price: 5.95,
	},
	{
		id: 'i4',
		name: 'Bolinhos de Bacalhau',
		description: 'Mini Salt cod fishcakes served with lime mayo',
		price: 8.15,
	},
	{
		id: 'i5',
		name: 'Frango a Passarinho',
		description: 'Marinated crispy chicken pieces served with lime mayo',
		price: 7.75,
	},
	{
		id: 'i6',
		name: 'Bacon',
		description:
			'Chicken pastries with aioli, a classic Brazilian street food',
		price: 8.25,
	},
];

function reducer(itemsState, action) {
	switch (action.type) {
		case 'ADD_ITEM_CART':
			//if I already have the item inside the ctx, and if I do, I should just change the amount of it, instead of just adding more item
			const updatedTotalAmount =
				itemsState.totalAmount + action.item.amount * action.item.price;

			const existingCartItemIndex = itemsState.items.findIndex(
				(item) => item.id === action.item.id
			);

			const existingCartItem = itemsState.items[existingCartItemIndex];

			// variables that will be useful
			let updatedItem;
			let updatedItems;

			// if the item is not in the cart yet
			if (existingCartItem) {
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
			}

			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			};

		// if the item is already in the cart just add one to amount
		case 'REMOVE_ITEM_CART':
			// remove item from cart

			const itemToRemoveIndex = itemsState.items.findIndex(
				(item) => item.id === action.id
			);

			const itemToRemove = itemsState.items[itemToRemoveIndex];

			const updatedTotalAmount2 =
				itemsState.totalAmount - itemToRemove.price;

			let updatedItem2;
			let updatedItems2;

			if (itemToRemove.amount === 1) {
				// remove this item from the state

				// filter the array of items those items that are not the same as my action item
				updatedItems2 = itemsState.items.filter(
					(item) => item.id !== action.id
				);
			} else {
				// just remove one in the amount
				updatedItem2 = {
					...itemToRemove,
					amount: itemToRemove.amount - 1,
				};

				//copy all my items and store it in an array
				updatedItems2 = [...itemsState.items];

				// in place of the item I want to remove replace it to my new updatedItem2
				updatedItems2[itemToRemoveIndex] = updatedItem2;
			}

			return {
				items: updatedItems2,
				totalAmount: updatedTotalAmount2,
			};
		// if the item is already in the cart just remove one of the amount
		default:
			return defaultCartState;
	}
}

function reducer2(state, action) {
	switch (action.type) {
		case 'ADD_AVAILABLE_ITEM':
			// let updatedList = state.concat(action.newItem);
			// console.log(updatedList);
			let updatedAvailableItems;

			updatedAvailableItems = state.concat(action.availableItem);
			return updatedAvailableItems;

		default:
			return state;
	}
}

const CartProvider = (props) => {
	// const [error, setError] = useState(null)

	// const fetchItemHandler = useCallback(async function(){
	// 	try{
	// 		const response = await fetch('https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/itemList.json',{method: 'GET'});

	// 		if(!response.ok){
	// 			throw new Error('Something went wrong')
	// 		}

	// 		const data = await response.json();
	// 		// console.log(data);

	// 	} catch(error) {
	// 		setError(error.message);
	// 	}

	// })

	// // execute fetchItemHandler when the app starts and every time my item change
	// useEffect(() => {
	//   fetchItemHandler();
	// }, [fetchItemHandler])

	// handling with adding items to cart ******************************
	const addItemToCartHandler = (item) => {
		// when I add an Item to cart, dispatch an action to execute the reducer function of add_item_cart
		// I'm passing all my items in the item property item, and to access it in my reducer is just call action.item
		dispatchAction({ type: 'ADD_ITEM_CART', item: item });
		// console.log(cartState);
		// console.log(cartState.items);
	};

	const removeItemOfCartHandler = (id) => {
		dispatchAction({ type: 'REMOVE_ITEM_CART', id: id });
	};

	// Handling with adding new Available items *****************************
	const addNewAvailableItemHandler = (availableItem) => {
		dispatchCurrentItemsAction({
			type: 'ADD_AVAILABLE_ITEM',
			availableItem: availableItem,
		});

	};

	const removeNewAvailableItemHandler = (id) => {
		return;
	};

	const [cartState, dispatchAction] = useReducer(reducer, defaultCartState);
	const [currentItemsState, dispatchCurrentItemsAction] = useReducer(
		reducer2,
		DUMMY_MEALS
	);

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemOfCartHandler,
		availableItems: currentItemsState,
		addNewAvailableItem: addNewAvailableItemHandler,
		removeAvailableItem: removeNewAvailableItemHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
