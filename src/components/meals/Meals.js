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

	/**
	 * Handling Loading and error
	 */
	let isLoading = ctx.isLoading;
	let error = ctx.error;

	const showIsLoading = () => {
		return (
			<section>
				<h1 className={classes.mealsIsLoading}>Loading...</h1>
			</section>
		);
	};

	const showError = () => {
		return (
			<section>
				<h1 className={classes.mealsError}>{error}</h1>
			</section>
		);
	};

	return (
		<section className={classes.sectionSummaryAndItems}>
			<RestaurantSummary />

			{/* handling is loading section  */}
			{isLoading ? (
				showIsLoading()
			) : (
				<AvailableMeals itemsList={ctx.availableItems} />
			)}

			{/* if I get some error show it */}
			{error && showError()}

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
