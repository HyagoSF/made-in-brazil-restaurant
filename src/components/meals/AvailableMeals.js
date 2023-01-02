// import classes from './AvailableMeals.module.css';

import Card from '../UI/Card/Card';

import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
	const DUMMY_MEALS = [
		{
			id: 'm1',
			name: 'Coxinha',
			description:
				'Chicken pastries with aioli, a classic Brazilian street food',
			price: 8.25,
		},
		{
			id: 'm2',
			name: 'Pao de Queijo',
			description: 'Brazilian mini cheese breads',
			price: 6.5,
		},
		{
			id: 'm3',
			name: 'Mandioca Frita',
			description: 'Cassava chips served with alioli',
			price: 5.95,
		},
		{
			id: 'm4',
			name: 'Bolinhos de Bacalhau',
			description: 'Mini Salt cod fishcakes served with lime mayo',
			price: 8.15,
		},
		{
			id: 'm5',
			name: 'Frango a Passarinho',
			description:
				'Marinated crispy chicken pieces served with lime mayo',
			price: 7.75,
		},
		{
			id: 'm6',
			name: 'Coxinha',
			description:
				'Chicken pastries with aioli, a classic Brazilian street food',
			price: 8.25,
		},
	];

	// always remember to use parenthesis when calling map for each item in the list
	const mealsList = DUMMY_MEALS.map((meal) => (
		<MealItem
			name={meal.name}
			description={meal.description}
			price={meal.price}
			key={meal.id}
		/>
	));

	return (
		<Card>
			<ul>{mealsList}</ul>
		</Card>
	);
};

export default AvailableMeals;
