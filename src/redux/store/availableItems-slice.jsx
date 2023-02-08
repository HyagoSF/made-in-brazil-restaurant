import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	availableItems: [],
	isLoading: false,
	error: null,
};

const availableItemsSlice = createSlice({
	name: 'availableItems',
	initialState,
	reducers: {
		fetchAvailableItems(state, action) {
			const availableItems = action.payload;
			const loadedAvailableItems = [];

			for (const key in availableItems) {
				loadedAvailableItems.push({
					id: key,
					name: availableItems[key].name,
					description: availableItems[key].description,
					price: availableItems[key].price,
				});
			}
			state.availableItems = loadedAvailableItems;
		},

		addNewAvailableItem(state, action) {
			let updatedAvailableItems;

			updatedAvailableItems = state.availableItems.concat(action.payload);

			state.availableItems = updatedAvailableItems;
		},
		removeAvailableItem(state, action) {
			let updatedAvailableItems;

			// in this case I have to pass my id as a payload
			updatedAvailableItems = state.availableItems.filter(
				(item) => item.id !== action.payload
			);

			state.availableItems = updatedAvailableItems;
		},
	},
});

export const availableItemsActions = availableItemsSlice.actions;

export default availableItemsSlice.reducer;
