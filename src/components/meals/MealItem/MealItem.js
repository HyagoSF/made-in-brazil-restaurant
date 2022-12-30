import classes from './MealItem.module.css';

import MealItemForm from './MealItemForm';

const MealItem = (props) => {
	return (
		<li className={classes.eachMeal}>
			<div>
				<p className={classes.name}>{props.name}</p>
				<p>{props.description}</p>
				<p className={classes.price}>$ {props.price}</p>
			</div>

			{/* Here is gonna be my form, to collect */}

			<MealItemForm />
		</li>
	);
};

export default MealItem;
