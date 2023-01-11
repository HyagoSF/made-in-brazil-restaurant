import RestaurantSummary from './RestaurantSummary';
import AvailableMeals from './AvailableMeals';

import classes from './Meals.module.css';

import { useState, useContext } from 'react';

import AddItemForm from '../AddItemForm/AddItemForm.js';
import AddItemFormBtn from '../AddItemForm/AddItemFormBtn';

import CartContext from '../../stage/cart-context';

const Meals = () => {
	const [isFormShown, setIsFormShown] = useState(false);
	const [isBtnShown, setIsBtnShown] = useState(true);

	const ctx = useContext(CartContext);

	const showFormHandler = () => {
		setIsFormShown(true);
		setIsBtnShown(false);
	};

	const closeFormHandler = () => {
		setIsFormShown(false);
		setIsBtnShown(true);
	};

	const addItemHandler = (item) => {
		ctx.addNewAvailableItem(item);
	};


	return (
		<section>
			<RestaurantSummary />
			<AvailableMeals itemsList={ctx.availableItems} />

			<div className={classes.form}>
				{isBtnShown && <AddItemFormBtn onClick={showFormHandler} />}
				{isFormShown && (
					<AddItemForm

						onClose={closeFormHandler}
						onAddItem={addItemHandler}
					/>
				)}
			</div>
		</section>
	);
};

export default Meals;
