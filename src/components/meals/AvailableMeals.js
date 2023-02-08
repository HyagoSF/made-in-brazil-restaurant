// import classes from './AvailableMeals.module.css';

import Card from '../UI/Card/Card';

import MealItem from './MealItem/MealItem';

const AvailableMeals = (props) => {
	// always remember to use parenthesis when calling map for each item in the list
	const mealsList = props.itemsList.map((item) => (
		<MealItem
			name={item.name}
			description={item.description}
			price={item.price}
			key={item.id}
			id={item.id}
		/>
	));

	return (
		<Card>
			<ul>{mealsList}</ul>
		</Card>
	);
};

export default AvailableMeals;
