import Header from './components/header/Header';

import Meals from './components/meals/Meals';

import Modal from './components/UI/Modal/Modal';

import { useState } from 'react';

import CartProvider from './stage/CartProvider';



const App = () => {

	const isModalOpenedHandler = (props) => {
		props.preventDefault();
		setIsModalOpened(true);
	};

	const onClose = (props) => {
		setIsModalOpened(false);
	};

	const [isModalOpened, setIsModalOpened] = useState(false);

	return (
		<CartProvider>
			{/* Header */}

			{isModalOpened && <Modal onClose={onClose} />}

			<Header
				onClick={isModalOpenedHandler}
				isModalOpened={isModalOpened}
			/>

			<main>
				{/* Meals */}

				<Meals />
			</main>

			{/* Footer */}
			<h1>Footer here</h1>
		</CartProvider>
	);
};

export default App;
