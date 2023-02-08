import RestaurantSummary from './RestaurantSummary';
import AvailableMeals from './AvailableMeals';

import classes from './Meals.module.css';

import { useState, useContext } from 'react';

import AddItemForm from '../AddItemForm/AddItemForm.js';
import AddItemFormBtn from '../AddItemForm/AddItemFormBtn';

import CartContext from '../../stage/cart-context';

import { useDispatch, useSelector } from 'react-redux';
import { availableItemsActions } from '../../redux/store/availableItems-slice';

const Meals = () => {
	const [isFormShown, setIsFormShown] = useState(false);
	const [isBtnShown, setIsBtnShown] = useState(true);

	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.ui.isLoggedIn);

	// const ctx = useContext(CartContext);

	// Getting the available items from the redux store
	const availableItems = useSelector(
		(state) => state.availableItems.availableItems
	);

	const showFormHandler = () => {
		setIsFormShown(true);
		setIsBtnShown(false);
	};

	const closeFormHandler = () => {
		setIsFormShown(false);
		setIsBtnShown(true);
	};

	const addItemHandler = (item) => {
		dispatch(availableItemsActions.addNewAvailableItem(item));

		// ctx.addNewAvailableItem(item);
	};

	/**
	 * Handling Loading and error
	 */
	// let isLoading = ctx.isLoading;
	// let error = ctx.error;
	let isLoading = availableItems.isLoading;
	let error = availableItems.error;

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

			{isLoading
				? showIsLoading()
				: isLoggedIn && (
						<div>
							<AvailableMeals itemsList={availableItems} />

							<div className={classes.form}>
								{isBtnShown && (
									<AddItemFormBtn onClick={showFormHandler} />
								)}
								{isFormShown && (
									<AddItemForm
										onClose={closeFormHandler}
										onAddItem={addItemHandler}
									/>
								)}
							</div>
						</div>
				  )}

			{error && showError()}
		</section>
	);
};

export default Meals;
