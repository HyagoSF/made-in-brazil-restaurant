import Header from './components/header/Header';

import Meals from './components/meals/Meals';

import Modal from './components/UI/Modal/Modal';

import { Fragment, useEffect, useState } from 'react';

import CartProvider from './stage/CartProvider';

import Footer from './components/footer/Footer';

import { useDispatch, useSelector } from 'react-redux';

import {
	fetchAvailableItemsData,
	fetchCartData,
} from './redux/actions/cart-actions';

const App = () => {
	const dispatch = useDispatch();

	const isModalOpenedHandler = (props) => {
		props.preventDefault();
		document.body.style.overflow = 'hidden';
		setIsModalOpened(true);
	};

	const onClose = () => {
		document.body.style.overflow = 'unset';
		setIsModalOpened(false);
	};

	const [isModalOpened, setIsModalOpened] = useState(false);

	useEffect(() => {
		// dispatch(fetchCartData());
		dispatch(fetchAvailableItemsData());
	}, [dispatch]);

	return (
		<Fragment>
			{/* Header */}

			{isModalOpened && <Modal onClose={onClose} />}

			{/* <h1>Checkout Branch</h1> */}

			<Header
				onClick={isModalOpenedHandler}
				isModalOpened={isModalOpened}
			/>

			<main>
				{/* Meals */}
				<Meals />
			</main>

			{/* Footer */}
			<Footer />
		</Fragment>
	);
};

export default App;
