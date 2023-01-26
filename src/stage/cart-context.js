import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

	const CartContext = React.createContext({
		items: [],
		totalAmount: 0,
		addItem: (item) => {},
		removeItem: (id) => {},
		availableItems: [],
		addNewAvailableItem: (availableItem) => {},
		removeAvailableItem: (id) => {},
		clearCart: () => {},
		
	});

export default CartContext;
