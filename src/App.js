import Header from './components/header/Header';

import Meals from './components/meals/Meals';

import Modal from './components/UI/Modal/Modal';

import { useState } from 'react';

import CartProvider from './stage/CartProvider';

import Footer from './components/footer/Footer';

const App = () => {
	const isModalOpenedHandler = (props) => {
		props.preventDefault();
		setIsModalOpened(true);
	};

	const onClose = () => {
		setIsModalOpened(false);
	};

	const [isModalOpened, setIsModalOpened] = useState(false);

	return (
		<CartProvider>
			{/* Header */}

			{isModalOpened && <Modal onClose={onClose} />}

			<h1>Adding form Branch</h1>

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
		</CartProvider>
	);
};

export default App;
