import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
	totalPriceOfItemsInCart: 0,
	totalOfItemsInCart: 0,
	isCartOpen: false,
	//hasChanged to be used to trigger useEffect in Cart.js, to update the cart in the database
	hasChanged: false,
	cartItemsStates: {
		bump: false,
		isCheckout: false,
		isSubmitting: false,
		didSubmit: false,
	},
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// to be used to replace my inicial state with the cart data from the database
		replaceCart(state, action) {
			state.cartItems = action.payload.items;
			state.totalPriceOfItemsInCart =
				action.payload.totalPriceOfItemsInCart;
			state.totalOfItemsInCart = action.payload.totalOfItemsInCart;
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.cartItems.find(
				(item) => item.id === newItem.id
			);

			state.totalPriceOfItemsInCart =
				state.totalPriceOfItemsInCart + newItem.price * newItem.amount;

			state.hasChanged = true;

			state.totalOfItemsInCart += newItem.amount;
			if (!existingItem) {
				state.cartItems.push({
					key: newItem.key,
					id: newItem.id,
					name: newItem.name,
					description: newItem.description,
					price: newItem.price,
					amount: newItem.amount,
				});
			} else {
				existingItem.amount++;
			}
		},
		removeItemFromCart(state, action) {
			const idOfItemToRemove = action.payload;
			const existingItem = state.cartItems.find(
				(item) => item.id === idOfItemToRemove
			);

			state.hasChanged = true;

			if (!existingItem) return;
			state.totalPriceOfItemsInCart -= existingItem.price;
			state.totalOfItemsInCart--;
			if (existingItem.amount === 1) {
				state.cartItems = state.cartItems.filter(
					(item) => item.id !== idOfItemToRemove
				);
			} else {
				existingItem.amount--;
			}
		},
		toggleCart(state, action) {
			state.isCartOpen = !state.isCartOpen;
		},
		clearCart(state, action) {
			// function to reset all my cart states to the initial state
			state.cartItems = initialState.cartItems;
			state.totalPriceOfItemsInCart =
				initialState.totalPriceOfItemsInCart;
			state.totalOfItemsInCart = initialState.totalOfItemsInCart;
			state.isCartOpen = initialState.isCartOpen;
			state.hasChanged = initialState.hasChanged;
			state.cartItemsStates.isCheckout =
				initialState.cartItemsStates.isCheckout;
			state.cartItemsStates.isSubmitting =
				initialState.cartItemsStates.isSubmitting;
			state.cartItemsStates.didSubmit =
				initialState.cartItemsStates.didSubmit;
		},
		// to set the current state of the cart to the database
		setIsCheckout(state, action) {
			state.cartItemsStates.isCheckout = action.payload;
		},
		setIsSubmitting(state, action) {
			state.cartItemsStates.isSubmitting = action.payload;
		},
		setDidSubmit(state, action) {
			state.cartItemsStates.didSubmit = action.payload;
		},
		setBump(state, action) {
			state.cartItemsStates.bump = action.payload;
		},
		addItemToCartInsideCheckout(state, action) {
			const existingItem = state.cartItems.find(
				(item) => item.id === action.payload.id
			);

			state.totalPriceOfItemsInCart =
				state.totalPriceOfItemsInCart + action.payload.price;
			state.hasChanged = true;

			state.totalOfItemsInCart += action.payload.amount;
			existingItem.amount++;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
