import { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

import Cart from '../../cart/Cart.js';

// the component `Backdrop` to make the background a little black
const Backdrop = (props) => {
	return <div onClick={props.onClose} className={classes.backdrop}></div>;
};

// this component is the Modal to show the real modal container overlay
const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<Cart onClick={props.onClose}>{props.children}</Cart>
		</div>
	);
};

const portalElement = document.getElementById('overlay');

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				portalElement
			)}

			{ReactDOM.createPortal(
				<ModalOverlay onClose={props.onClose}>
					{props.children}
				</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
};

export default Modal;
