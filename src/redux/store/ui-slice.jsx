// Description: This file contains the UI slice of the redux store

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: false,
	showNotification: null,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleLogin(state, action) {
			state.isLoggedIn = !state.isLoggedIn;
		},
		showNotification(state, action) {
			state.showNotification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
