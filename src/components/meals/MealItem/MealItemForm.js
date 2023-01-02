import classes from './MealItemForm.module.css';

import Input from '../../UI/Input/Input';

const MealItemForm = () => {
	const onAddItemToCartHandler = (e) => {
		e.preventDefault();
		console.log();
	}


	return (
		<form action="#" className={classes.form}>
			<Input input={{ type: 'number', max: 5, min: 1, name: 'amount' }} />

			<button onClick={onAddItemToCartHandler} className={classes.button}>+ add</button>
		</form>
	);
};

export default MealItemForm;
