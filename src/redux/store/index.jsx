import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart-slice.jsx';
import availableItemsSlice from './availableItems-slice';
import uiSlice from './ui-slice.jsx';

const store = configureStore({
	reducer: {
		cart: cartSlice,
		availableItems: availableItemsSlice,
		ui: uiSlice,
	},
});

export default store;
