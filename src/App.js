import { Fragment } from 'react';

import Header from './components/header/Header';

const App = () => {
	return (
		<Fragment>
			{/* Header */}
            <Header />

			<main>
				{/* Meals */}
				<h1>Meals here</h1>
			</main>

			{/* Footer */}
            <h1>Footer here</h1>
		</Fragment>
	);
};

export default App;
