import { cartActions } from '../store/cart-slice';
import { uiActions } from '../store/ui-slice';
import axios from 'axios';

import { availableItemsActions } from '../store/availableItems-slice';

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			dispatch(
				uiActions.showNotification({
					status: 'pending',
					title: 'Loading...',
					message: 'Fetching cart data!',
				})
			);

			const response = await axios
				.get(
					'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/itemsList/cartItems.json'
				)
				.then((response) => {
					const cartData = response.data;

					dispatch(
						uiActions.showNotification({
							status: 'success',
							title: 'Success!',
							message: 'Cart data fetched successfully!',
						})
					);
					return cartData;
					// return response.data;
				})
				.catch((error) => {
					console.log(error);
					throw new Error('Something went wrong!');
				});
			return response;
		};

		try {
			const cartData = await fetchData();
			console.log('cartData: ', cartData);

			dispatch(
				cartActions.replaceCart({
					cartItems: cartData.cartItems,
					totalPriceOfItemsInCart: cartData.totalPriceOfItemsInCart,
					totalOfItemsInCart: cartData.totalOfItemsInCart,
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Fetching cart data failed!',
				})
			);
		}
	};
};

export const fetchAvailableItemsData = () => {
	return async (dispatch) => {
		const fetchAvailableItemsData = async () => {
			dispatch(
				uiActions.showNotification({
					status: 'pending',
					title: 'Loading...',
					message: 'Fetching available items data!',
				})
			);

			const response = await axios
				.get(
					'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/itemsList/availableItems.json'
				)
				.then((response) => {
					const availableItemsData = response.data;

					dispatch(
						uiActions.showNotification({
							status: 'success',
							title: 'Success!',
							message:
								'Available items data fetched successfully!',
						})
					);
					return availableItemsData;
					// return response.data;
				})
				.catch((error) => {
					console.log(error);
					throw new Error('Something went wrong!');
				});
			return response;
		};

		try {
			const availableItems = await fetchAvailableItemsData();

			dispatch(availableItemsActions.fetchAvailableItems(availableItems));

			// console.log('availableItems: ', availableItems);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Fetching available items data failed!',
				})
			);
		}
	};
};
