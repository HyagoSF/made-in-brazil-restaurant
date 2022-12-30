import { Fragment } from 'react';

import Header from './components/header/Header';

import Meals from './components/meals/Meals';

const App = () => {
	return (
		<Fragment>
			{/* Header */}
			<Header />

			<main>
				{/* Meals */}

				<Meals />
			</main>

			{/* Footer */}
			<h1>Footer here</h1>
		</Fragment>
	);
};

export default App;
