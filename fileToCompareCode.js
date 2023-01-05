import { useReducer } from 'react';

//Goal of this component: manage the cart-context data and provide that context to all components that want access to it

import CartContext from './cart-context';

//simple object where I say that I have no items yet
const defaultCartState = {
	items: [],
	totalAmount: 0,
};

//create this cartReducer outside of the CartProvider Component because it won't need anything from that component
const cartReducer = (state, action) => {
	//the action is dispatch by me, and the state is the last state snapshot of the state managed by the reducer
	switch (action.type) {
		//when my action.type is add_cart_item i'm gonna update my array, creating another one, and as well update my totalAmount
		case 'ADD_CART_ITEM':
			const updatedTotalAmount =
				state.totalAmount + action.item.price * action.item.amount;

			// to return true if the item that I'm adding to cart has the same id as one that I already have in my state
			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.item.id
			);
			// if there's already this item, then set it in this constant
			const existingCartItem = state.items[existingCartItemIndex];

			// creating variables
			let updatedItem;
			let updatedItems;

			//if there is this item
			if (existingCartItem) {
				// then create this updatedItem
				updatedItem = {
					//copy all properties of this item
					...existingCartItem,
					// and then change the amount to the new amount I have in the action.item.amount
					amount: existingCartItem.amount + action.item.amount,
				};
				// copy my last items object array
				updatedItems = [...state.items];
				// and then in the existingCartItemIndex place I'll change to the updatedItem, with the correct amount
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				// in case of the item is not in the list yet, the updatedItem is simple a new item, where I copy my action.item
				updatedItem = { ...action.item };
				// and updatedItems I concat this updatedItem
				updatedItems = state.items.concat(updatedItem);
			}

			return { items: updatedItems, totalAmount: updatedTotalAmount }; //this return will be my next state

		//letting this commented because I did, and I'm not sure if it's right
		case 'REMOVE_CART_ITEM':
			// I have to check if I have more than one item, if I do, then I have to change just the amount of it, if just have one, I have to remove the item from the list.

			// finding the index of the item that I clicked the button to remove it
			const existingCartItemIndex2 = state.items.findIndex(
				(item) => item.id === action.id
			);

			// once I have this index, I'm storing this item in this const
			const existingCartItem2 = state.items[existingCartItemIndex2];

			// this is to update the total amount
			const updatedTotalAmount2 =
				state.totalAmount - existingCartItem2.price;

			// creating this 2 variables to use in the logic
			let updatedItem2;
			let updatedItems2;

			// if the amount of the item is more than one
			if (existingCartItem2.amount > 1) {
				// copy the cart item, and change the amount removing one of it
				updatedItem2 = {
					...existingCartItem2,
					amount: existingCartItem2.amount - 1,
				};

				// creating a new array with the old items in the state
				updatedItems2 = [...state.items];

				// and updating the existing item inside this old array, to that new item with the correct amount(with one less item)
				updatedItems2[existingCartItemIndex2] = updatedItem2;
			} else {
				// if the amount of this item is just one, then remove this item from the list
				updatedItems2 = state.items.filter(
					(item) => item.id !== action.id
				);
			}

			//this return will be my next state
			return { items: updatedItems2, totalAmount: updatedTotalAmount2 };

		// ************************************************************************************
		// // ME TRYING TO MAKE IT WORKS

		// const itemsWithItemRemoved = state.items.filter(
		// 	(item) => item.id !== action.item.id
		// );
		// // console.log(state.items);
		// const updatedItemsAfterRemove = {
		// 	items: [itemsWithItemRemoved],
		// };

		// // make updatedItems my new state of my context
		// state.items = updatedItems;

		// let allItems = state.items;
		// const itemWithIdIndex = allItems.findIndex(
		// 	(item) => item.id === action.id
		// );

		// const updatedTotalAmountAfterRemove =
		// 	state.totalAmount - action.id.price * action.id.amount;

		// if (itemWithIdIndex > -1) {
		// 	allItems.splice(itemWithIdIndex, 1);
		// }

		// return updatedItemsAfterRemove;

		// ************************************************************************************

		default:
			return defaultCartState;
		// throw new Error();
	}
};

const CartProvider = (props) => {
	//first value is the current state, second is to dispatch values
	const [cartState, dispatchCarAction] = useReducer(
		cartReducer, //reducer
		defaultCartState //initialArg
	);

	const addItemToCartHandler = (item) => {
		//I'm forwarding this item that I'm getting by this function, to the reducer
		dispatchCarAction({ type: 'ADD_CART_ITEM', item: item });
	};

	const removeItemFromCartHandler = (id) => {
		//I'm forwarding the item of the id that I'm getting by this function, to the reducer
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