import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Redux
import { Provider } from 'react-redux';
import store from '../src/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	// 	<App />
	// </React.StrictMode>

	// Providing my entire app with the store
	<Provider store={store}>
		<App />
	</Provider>
);
