import React, { useReducer, useState, useCallback, useEffect } from 'react';
import CartContext from './cart-context.js';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

/**
 * REDUCERS
 */

// to add items to cart
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

		case 'CLEAR_CART':
			return defaultCartState;

		// if the item is already in the cart just remove one of the amount
		default:
			return defaultCartState;
	}
}

// to add available items
function reducer2(state, action) {
	switch (action.type) {
		case 'GET_THE_INITIAL_VALUES':
			const dbMeals = action.initialValues;
			const loadedMeals = [];

			// console.log('hello');

			for (const key in dbMeals) {
				loadedMeals.push({
					id: key,
					name: dbMeals[key].name,
					description: dbMeals[key].description,
					price: dbMeals[key].price,
				});
			}
			return loadedMeals;
		case 'ADD_AVAILABLE_ITEM':
			let updatedAvailableItems;

			updatedAvailableItems = state.concat(action.availableItem);
			return updatedAvailableItems;

		default:
			return state;
	}
}

/**
 * CartProvider Component
 */
const CartProvider = (props) => {
	/**
	 * States
	 */
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [cartState, dispatchAction] = useReducer(reducer, defaultCartState);
	const [currentItemsState, dispatchCurrentItemsAction] = useReducer(
		reducer2,
		[]
	);

	/**
	 * Handlers
	 */

	// Cart Items
	const addItemToCartHandler = async (item) => {
		try {
			const response = await fetch(
				'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/itemsList/cartItems.json',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(item),
				}
			);

			// when I add an Item to cart, dispatch an action to execute the reducer function of add_item_cart
			// I'm passing all my items in the item property item, and to access it in my reducer is just call action.item
			dispatchAction({ type: 'ADD_ITEM_CART', item: item });
			// console.log(cartState);
			// console.log(cartState.items);
		} catch (e) {
			console.log(e.message);
		}
	};

	/**
	 *
	 *
	 *
	 * NEED TO FIX HERE, I'M CURRENTLY NOT ABLE TO REMOVE ITEMS FROM MY FIREBASE
	 */
	const removeItemOfCartHandler = async (id) => {
		const url =
			'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/itemsList/cartItems/';

		const response = await fetch(url + id + '.json', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(id),
		});
		if (!response.ok) {
			throw new Error('Something happened');
		}

		console.log(id);

		dispatchAction({ type: 'REMOVE_ITEM_CART', id: id });
	};

	//  Available items

	// To get the initial data from my firebase
	const fetchItemHandler = async function () {
		try {
			const response = await fetch(
				'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/itemsList/availableItems.json',
				{ method: 'GET' }
			);

			if (!response.ok) {
				throw new Error('Something went wrong');
			}

			const data = await response.json();

			dispatchCurrentItemsAction({
				type: 'GET_THE_INITIAL_VALUES',
				initialValues: data,
			});
		} catch (error) {
			setError(error.message);
		}

		setIsLoading(false);
	};

	// console.log(isLoading)

	const addNewAvailableItemHandler = async (availableItem) => {
		try {
			const response = await fetch(
				'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/itemsList/availableItems.json',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(availableItem),
				}
			);

			dispatchCurrentItemsAction({
				type: 'ADD_AVAILABLE_ITEM',
				availableItem: availableItem,
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	const removeNewAvailableItemHandler = async (id) => {
		return;
	};

	const clearCartHandler = (params) => {
		dispatchAction({ type: 'CLEAR_CART' });
	};

	// execute fetchItemHandler when the app starts and every time my item change
	useEffect(() => {
		fetchItemHandler();
	}, []);

	/**
	 * The real context I'll pass to components
	 */
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemOfCartHandler,
		addNewAvailableItem: addNewAvailableItemHandler,
		removeAvailableItem: removeNewAvailableItemHandler,
		availableItems: currentItemsState,
		isLoading: isLoading,
		error,
		clearCart: clearCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
