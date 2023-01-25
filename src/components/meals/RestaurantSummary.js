import classes from './RestaurantSummary.module.css';

// import image from '../../assets/Prancheta1.png';

const RestaurantSummary = () => {
	return (
		<div className={classes.summary}>
			<div>
				<h1>Made In Brasil</h1>
				<h2>
					Experience the Flavors of Brazil - The Brazilian Food
					Delivery App
				</h2>

				<p>
					Are you craving for the delicious taste of authentic
					Brazilian cuisine? Look no further! Made in Brazil is here
					to bring the best of Brazil to your doorstep. Our app offers
					a wide variety of traditional dishes from different regions
					of Brazil, prepared with love and care by our experienced
					chefs.
					<br />
					<br />
					From mouth-watering churrasco to delectable feijoada, we
					have something for everyone. Our app makes ordering easy and
					convenient, allowing you to track your delivery in
					real-time. Download Made in Brazil today and taste the
					flavors of Brazil right in your own home!
				</p>
			</div>

			<div className={classes.image1} />
		</div>
	);
};

export default RestaurantSummary;
