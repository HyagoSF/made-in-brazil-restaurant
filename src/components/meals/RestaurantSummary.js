import classes from './RestaurantSummary.module.css';

import image from '../../assets/MadeInBrazil.jpg';

const RestaurantSummary = () => {
	return (
		<div className={classes.summary}>
			<div>
				<h3>Made In Brasil Restaurant</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Fuga id architecto cupiditate a? Nobis officia deserunt
					dolorem suscipit eum explicabo voluptates reprehenderit in,
					ex nulla officiis, eius excepturi non consectetur!
				</p>
			</div>

			{/* <div className={classes.image1}></div> */}
			<img src={image} alt="Made in Brazil pic" className={classes.image1}/>
		</div>
	);
};

export default RestaurantSummary;
