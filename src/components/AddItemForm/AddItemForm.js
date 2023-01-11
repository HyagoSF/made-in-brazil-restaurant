import { useRef } from 'react';
import classes from './AddItemForm.module.css';

import AddItemFormBtn from './AddItemFormBtn';

const AddItemForm = (props) => {
	// const id = useRef('');
	const name = useRef('');
	const description = useRef('');
	const price = useRef();

	const cleanInputs = () => {
		name.current.value = '';
		description.current.value = '';
		price.current.value = null;
	};

	const onAddItemForm = (e) => {
		e.preventDefault();

		let randomId = new Date().getTime();

		// to make into 2 fixed decimals, but this return me a string
		let number = (+price.current.value).toFixed(2);
		// to make it into a number again
		let transformedNumber = +number;

		const item = {
			id: randomId,
			name: name.current.value,
			description: description.current.value,
			price: transformedNumber,
		};

		props.onAddItem(item);

		cleanInputs();
	};

	const onClose = () => {
		props.onClose();
	};

	return (
		<section className={classes.formSection}>
			<form onSubmit={onAddItemForm} className={classes.form}>
				<div>
					<label className={classes.label} htmlFor="">
						Name
					</label>
					<input
						className={classes.input}
						type="text"
						name="name"
						id="name"
						ref={name}
						required
					/>
				</div>

				<div className="">
					<label className={classes.label} htmlFor="">
						Description
					</label>
					<textarea
						className={classes.input}
						rows="5"
						type="textArea"
						name="description"
						id="description"
						ref={description}
						required
					/>
				</div>

				<div className="">
					<label className={classes.label} htmlFor="">
						Price
					</label>
					<input
						className={classes.input}
						type="text"
						name="price"
						id="price"
						ref={price}
						required
					/>
				</div>

				<section className={classes.buttons}>
					<button className={classes.btnClose} onClick={onClose}>
						Cancel
					</button>
					<AddItemFormBtn type="submit" />
				</section>
			</form>
		</section>
	);
};

export default AddItemForm;
