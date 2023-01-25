import { useRef } from 'react';
import classes from './AddItemForm.module.css';
import useInput from '../../hooks/use-input';

import AddItemFormBtn from './AddItemFormBtn';

const AddItemForm = (props) => {
	//for name
	const {
		value: {
			enteredValue: name,
			// valueWasTouched: nameInputWasTouched,
			// valueIsValid: isNameValid,
			isValueInvalid: isNameInvalid,
			onValueChangeHandler: onNameChangeHandler,
			onValueBlurHandler: onNameBlurHandler,
			reset: resetName,
		},
	} = useInput((value) => value.trim() !== '');

	//for description
	const {
		value: {
			enteredValue: description,
			// valueWasTouched: nameInputWasTouched,
			// valueIsValid: isNameValid,
			isValueInvalid: isDescriptionInvalid,
			onValueChangeHandler: onDescriptionChangeHandler,
			onValueBlurHandler: onDescriptionBlurHandler,
			reset: resetDescription,
		},
	} = useInput((value) => value.trim() !== '');

	//for price
	const {
		value: {
			enteredValue: price,
			// valueWasTouched: nameInputWasTouched,
			// valueIsValid: isNameValid,
			isValueInvalid: isPriceInvalid,
			onValueChangeHandler: onPriceChangeHandler,
			onValueBlurHandler: onPriceBlurHandler,
			reset: resetPrice,
		},
	} = useInput((value) => /^(0|[1-9]\d*)(\.\d+)?$/.test(value) && value > 0);

	// const id = useRef('');
	// const name = useRef('');
	// const description = useRef('');
	// const price = useRef();

	// const cleanInputs = () => {
	// 	name.current.value = '';
	// 	description.current.value = '';
	// 	price.current.value = null;
	// };

	const nameClassInvalid = isNameInvalid ? classes['form-invalid'] : '';
	const descriptionClassInvalid = isDescriptionInvalid
		? classes['form-invalid']
		: '';
	const priceClassInvalid = isPriceInvalid ? classes['form-invalid'] : '';

	// form submit handler
	const onAddItemForm = (e) => {
		e.preventDefault();

		let randomId = new Date().getTime();

		// to make into 2 fixed decimals, but this return me a string
		let number = (+price).toFixed(2);
		// to make it into a number again
		let transformedNumber = +number;

		const item = {
			id: randomId,
			name: name,
			description: description,
			price: transformedNumber,
		};

		props.onAddItem(item);

		resetName();
		resetDescription();
		resetPrice();

		// cleanInputs();
	};

	// to close the form
	const onClose = () => {
		props.onClose();
	};

	return (
		<section className={classes.formSection}>
			<form onSubmit={onAddItemForm} className={classes.form}>
				<div className={nameClassInvalid}>
					<label className={classes.label} htmlFor="">
						Name
					</label>
					<input
						className={classes.input}
						onChange={onNameChangeHandler}
						onBlur={onNameBlurHandler}
						value={name}
						type="text"
						name="name"
						id="name"
						// ref={name}
						// required
					/>

					{isNameInvalid && (
						<p className={classes.invalid}>Add a name</p>
					)}
				</div>

				<div className={descriptionClassInvalid}>
					<label className={classes.label} htmlFor="">
						Description
					</label>
					<textarea
						className={classes.input}
						onChange={onDescriptionChangeHandler}
						onBlur={onDescriptionBlurHandler}
						value={description}
						rows="5"
						type="textArea"
						name="description"
						id="description"
						// ref={description}
						required
					/>
					{isDescriptionInvalid && (
						<p className={classes.invalid}> Add some description</p>
					)}
				</div>

				<div className={priceClassInvalid}>
					<label className={classes.label} htmlFor="">
						Price
					</label>
					<input
						className={classes.input}
						onChange={onPriceChangeHandler}
						onBlur={onPriceBlurHandler}
						value={price}
						type="text"
						name="price"
						id="price"
						// ref={price}
						required
					/>
					{isPriceInvalid && (
						<p className={classes.invalid}> Add a valid price</p>
					)}
				</div>

				<div className={classes.buttons}>
					<button className={classes.btnClose} onClick={onClose}>
						Cancel
					</button>
					<AddItemFormBtn type="submit" />
				</div>
			</form>
		</section>
	);
};

export default AddItemForm;
