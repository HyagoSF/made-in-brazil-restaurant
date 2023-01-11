import classes from './RestaurantSummary.module.css';

import image from '../../assets/Prancheta1.png';

const RestaurantSummary = () => {
	return (
		<div className={classes.summary}>
			<div>
				<ul>
					<li>The flavor of life depends on who tempers it</li>
					<li>Cooking is a way of loving others</li>
					<li>
						Cooking for those we like is not an obligation, it is an
						act of love
					</li>
					<li>
						The best memories are made of: Good food, good friends
						and good times
					</li>
					<li>Love is the main ingredient in our cuisine</li>
					<li>The cheff's trick here is love</li>
				</ul>
			</div>

			<div className={classes.image1}/>
		</div>
	);
};

export default RestaurantSummary;
