import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';
import axios from 'axios';

// name, street, postal code, city

const Checkout = (props) => {
	// Name validation
	const {
		value: {
			enteredValue: enteredName,
			isValueInvalid: isNameInvalid,
			onValueChangeHandler: onNameChangeHandler,
			onValueBlurHandler: onNameBlurHandler,
			reset: resetName,
		},
	} = useInput((value) => value.trim() !== '');

	// Email validation
	const {
		value: {
			enteredValue: enteredEmail,
			isValueInvalid: isEmailInvalid,
			onValueChangeHandler: onEmailChangeHandler,
			onValueBlurHandler: onEmailBlurHandler,
			reset: resetEmail,
		},
	} = useInput((value) =>
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			value
		)
	);

	// Street validation
	const {
		value: {
			enteredValue: enteredStreet,
			isValueInvalid: isStreetInvalid,
			onValueChangeHandler: onStreetChangeHandler,
			onValueBlurHandler: onStreetBlurHandler,
			reset: resetStreet,
		},
	} = useInput((value) => value.trim() !== '');

	// PostalCode validation
	const {
		value: {
			enteredValue: enteredPostalCode,
			isValueInvalid: isPostalCodeInvalid,
			onValueChangeHandler: onPostalCodeChangeHandler,
			onValueBlurHandler: onPostalCodeBlurHandler,
			reset: resetPostalCode,
		},
	} = useInput((value) => value.trim() !== '');

	// City validation
	const {
		value: {
			enteredValue: enteredCity,
			isValueInvalid: isCityInvalid,
			onValueChangeHandler: onCityChangeHandler,
			onValueBlurHandler: onCityBlurHandler,
			reset: resetCity,
		},
	} = useInput((value) => value.trim() !== '');

	//for name and input name styles
	const showInvalidName = isNameInvalid ? classes.invalid : '';
	const showInvalidNameInput = isNameInvalid ? classes['form-invalid'] : '';

	//for email and input email styles
	const showInvalidEmail = isEmailInvalid ? classes.invalid : '';
	const showInvalidEmailInput = isEmailInvalid ? classes['form-invalid'] : '';

	//for Street and input Street styles
	const showInvalidStreet = isStreetInvalid ? classes.invalid : '';
	const showInvalidStreetInput = isStreetInvalid
		? classes['form-invalid']
		: '';

	//for PostalCode and input PostalCode styles
	const showInvalidPostalCode = isPostalCodeInvalid ? classes.invalid : '';
	const showInvalidPostalCodeInput = isPostalCodeInvalid
		? classes['form-invalid']
		: '';

	//for City and input City styles
	const showInvalidCity = isCityInvalid ? classes.invalid : '';
	const showInvalidCityInput = isCityInvalid ? classes['form-invalid'] : '';

	/**
	 *  Form Submit Handler
	 */

	const onSubmitForm = (e) => {
		e.preventDefault();

		const user = {
			name: enteredName,
			email: enteredEmail,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		};

		axios
			.post(
				'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/users.json',
				user
			)
			.then(
				(response) => {
					console.log(response);
					resetName();
					resetEmail();
					resetStreet();
					resetPostalCode();
					resetCity();
					// return user;
				},
				(error) => {
					console.log(error);
				}
			);

		// Make a request for a user with a given ID
		axios
			.get(
				'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/users.json'
			)
			.then(function (response) {
				// handle success
				console.log(response);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	};

	return (
		<form onSubmit={onSubmitForm} className={classes.checkoutForm}>
			<div>
				<label htmlFor="name">Name: </label>
				<input
					className={showInvalidNameInput}
					onChange={onNameChangeHandler}
					onBlur={onNameBlurHandler}
					value={enteredName}
					type="text"
					name="name"
					id="name"
					required
				/>

				{isNameInvalid && (
					<p className={showInvalidName}>Please enter a name.</p>
				)}
			</div>

			<div className="">
				<label htmlFor="email">Email: </label>
				<input
					className={showInvalidEmailInput}
					type="text"
					name="email"
					id="email"
					onChange={onEmailChangeHandler}
					onBlur={onEmailBlurHandler}
					value={enteredEmail}
					required
				/>

				{isEmailInvalid && (
					<p className={showInvalidEmail}>
						Please enter a valid email.
					</p>
				)}
			</div>

			<div className="">
				<label htmlFor="street">Street: </label>
				<input
					className={showInvalidStreetInput}
					type="text"
					name="street"
					id="street"
					onChange={onStreetChangeHandler}
					onBlur={onStreetBlurHandler}
					value={enteredStreet}
					required
				/>

				{isStreetInvalid && (
					<p className={showInvalidStreet}>
						Please enter a valid street.
					</p>
				)}
			</div>

			<div className="">
				<label htmlFor="postalcode">PostalCode: </label>
				<input
					className={showInvalidPostalCodeInput}
					type=""
					name="postalcode"
					id="postalcode"
					onChange={onPostalCodeChangeHandler}
					onBlur={onPostalCodeBlurHandler}
					value={enteredPostalCode}
					required
				/>

				{isPostalCodeInvalid && (
					<p className={showInvalidPostalCode}>
						Please enter a valid Postal Code.
					</p>
				)}
			</div>

			<div className="">
				<label htmlFor="city">City: </label>
				<input
					className={showInvalidCityInput}
					type="text"
					name="city"
					id="city"
					onChange={onCityChangeHandler}
					onBlur={onCityBlurHandler}
					value={enteredCity}
					required
				/>

				{isCityInvalid && (
					<p className={showInvalidCity}>
						Please enter a valid City.
					</p>
				)}
			</div>

			<div className={classes.checkoutBtns}>
				<button
					type="button"
					className={classes.btnClose}
					onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.btnOrder} type="submit">
					submit
				</button>
			</div>
		</form>
	);
};

export default Checkout;
