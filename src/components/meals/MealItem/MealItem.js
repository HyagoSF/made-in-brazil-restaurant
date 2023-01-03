import { useContext, useRef } from 'react';
import CartContext from '../../../stage/cart-context';
import classes from './MealItem.module.css';

import MealItemForm from './MealItemForm';

const MealItem = (props) => {
	// initialValue of my ref (this refItem is gonna be my amount value)
	// const refItem = useRef();

	const ctx = useContext(CartContext);

	const onAddItemToCartHandler = (amount) => {

		//I need to add the item and pass the item I got from the input, I have to use useRef to be able to take data from that input and pass that ref to my addItem
		ctx.addItem({
			key: props.id,
			name: props.name,
			description: props.description,
			price: props.price,
			amount: amount, 
		});
	};

	return (
		<li className={classes.eachMeal}>
			<div>
				<p className={classes.name}>{props.name}</p>
				<p>{props.description}</p>
				<p className={classes.price}>$ {props.price}</p>
			</div>

			{/* Here is gonna be my form, to collect data of amount*/}
			<MealItemForm
				// ref={refItem}
				onAddItemToCart={onAddItemToCartHandler}
			/>
		</li>
	);
};

export default MealItem;
