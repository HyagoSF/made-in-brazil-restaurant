import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

// name, street, postal code, city

const Checkout = (props) => {
	// Name validation
	const {
		value: {
			enteredValue: enteredName,
			valueWasTouched: nameWasTouched,
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
			valueWasTouched: emailWasTouched,
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
			valueWasTouched: streetWasTouched,
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
			valueWasTouched: postalCodeWasTouched,
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
			valueWasTouched: cityWasTouched,
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

		const formIsValid =
			!isNameInvalid &&
			!isEmailInvalid &&
			!isStreetInvalid &&
			!isPostalCodeInvalid &&
			!isCityInvalid;

		const formWasTouched =
			nameWasTouched &&
			emailWasTouched &&
			streetWasTouched &&
			postalCodeWasTouched &&
			cityWasTouched;

		if (!formIsValid || !formWasTouched) {
			console.log('Form is not valid');
			return;
		}

		const user = {
			name: enteredName,
			email: enteredEmail,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		};

		//to send the userData to my cart component, and then there I'll be able to send a post request to save it into my db
		props.onSubmitOrder(user);

		resetName();
		resetEmail();
		resetStreet();
		resetPostalCode();
		resetCity();
	};

	/**
	 *  just a test to get the user data using axios
	 */
	// const axiosTest = async () => {
	// 	// GET request for remote image in node.js
	// 	axios({
	// 		method: 'get',
	// 		url: 'https://made-in-brazil-restaurant-default-rtdb.firebaseio.com/users.json',
	// 		responseType: 'json',
	// 	}).then(function (response) {
	// 		let users = [];

	// 		for (const key in response.data) {
	// 			// console.log(response.data[key].postalCode);
	// 			users.push({
	// 				key: key,
	// 				name: response.data[key].name,
	// 				email: response.data[key].email,
	// 				street: response.data[key].street,
	// 				postalCode: response.data[key].postalCode,
	// 				city: response.data[key].city,
	// 			});
	// 		}

	// 		console.log(users);
	// 	});
	// };

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
					required
					onChange={onEmailChangeHandler}
					onBlur={onEmailBlurHandler}
					value={enteredEmail}
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
					required
					onChange={onStreetChangeHandler}
					onBlur={onStreetBlurHandler}
					value={enteredStreet}
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
					required
					onChange={onPostalCodeChangeHandler}
					onBlur={onPostalCodeBlurHandler}
					value={enteredPostalCode}
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
					required
					onChange={onCityChangeHandler}
					onBlur={onCityBlurHandler}
					value={enteredCity}
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

				{/* <button type="button" onClick={axiosTest}>
					see Users
				</button> */}
			</div>
		</form>
	);
};

export default Checkout;
