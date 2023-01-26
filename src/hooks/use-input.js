import { useState } from 'react';

const useInput = (validation) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [valueWasTouched, setValueWasTouched] = useState(false);

	const valueIsValid = validation(enteredValue);
	const isValueInvalid = !valueIsValid && valueWasTouched;

	const onValueChangeHandler = (e) => {
		setEnteredValue(e.target.value);
	};

	const onValueBlurHandler = (e) => {
		setValueWasTouched(true);
	};

	const reset = (e) => {
		setEnteredValue('');
		setValueWasTouched(false);
	};

	return {
		value: {
			enteredValue,
			// valueWasTouched,
			// valueIsValid,
			isValueInvalid,
			onValueChangeHandler,
			onValueBlurHandler,
            reset
		},
	};
};

export default useInput;
