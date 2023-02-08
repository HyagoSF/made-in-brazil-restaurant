import React from 'react';

const CartContext = React.createContext({
	items: [],
	availableItems: [],
	totalAmount: 0,
	addItem: (item) => {},
	removeItem: (id) => {},
	addNewAvailableItem: (availableItem) => {},
	removeAvailableItem: (id) => {},
	clearCart: () => {},
});

export default CartContext;
