import classes from './MealItemForm.module.css';

// import React from 'react';

import Input from '../../UI/Input/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
	const refItem = useRef();
	const [isAmountValid, setIsAmountIsValid] = useState(true);

	// just take the amount when I submit this form, cause it will just execute when this happens
	const onSubmitHandler = (e) => {
		e.preventDefault();

		const currentAmountAsString = refItem.current.value;	//If I don't use .value I'll get the input as html

		const currentAmountAsNumber = +currentAmountAsString;	//to transform to number

		if (
			currentAmountAsString.trim().length === 0 ||
			currentAmountAsNumber < 1 ||
			currentAmountAsNumber > 5
		) {
			setIsAmountIsValid(false);
			// and then return not to add this item to cart
			return
		}

		props.onAddItemToCart(currentAmountAsNumber);
		setIsAmountIsValid(true);
	};

	return (
		<form action="" className={classes.form} onSubmit={onSubmitHandler}>
			<Input
				ref={refItem}
				input={{ type: 'number', max: '5', min: '1', name: 'amount' }}
			/>

			<button className={classes.button}>+ add</button>
			{!isAmountValid && <p>Please insert a valid value.</p>}
		</form>
	);
};

export default MealItemForm;
