import { useReducer } from 'react';

import CartContext from './cart-context';

//simple object where I say that I have no items yet
const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CART_ITEM':
			const updatedTotalAmount =
				state.totalAmount + action.item.price * action.item.amount;

			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.item.id
			);

			const existingCartItem = state.items[existingCartItemIndex];

			let updatedItem;
			let updatedItems;

			if (existingCartItem) {
				updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItem = { ...action.item };
				updatedItems = state.items.concat(updatedItem);
			}

			return { items: updatedItems, totalAmount: updatedTotalAmount };

		case 'REMOVE_CART_ITEM':
			const existingCartItemIndex2 = state.items.findIndex(
				(item) => item.id === action.id
			);

			const existingCartItem2 = state.items[existingCartItemIndex2];

			const updatedTotalAmount2 =
				state.totalAmount - existingCartItem2.price;

			let updatedItem2;
			let updatedItems2;

			if (existingCartItem2.amount > 1) {
				updatedItem2 = {
					...existingCartItem2,
					amount: existingCartItem2.amount - 1,
				};

				updatedItems2 = [...state.items];

				updatedItems2[existingCartItemIndex2] = updatedItem2;
			} else {
				updatedItems2 = state.items.filter(
					(item) => item.id !== action.id
				);
			}

			return { items: updatedItems2, totalAmount: updatedTotalAmount2 };

		default:
			return defaultCartState;
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCarAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCarAction({ type: 'ADD_CART_ITEM', item: item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCarAction({ type: 'REMOVE_CART_ITEM', id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
