import classes from './MealItemForm.module.css';

import Input from '../../UI/Input/Input';

const MealItemForm = () => {
	return (
		<form action="" className={classes.form}>
			<Input input={{ type: 'number', max: 5, min: 1, name: 'amount' }} />

			<button className={classes.button}>+ add</button>
		</form>
	);
};

export default MealItemForm;
