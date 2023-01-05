import classes from './Input.module.css';
import React from 'react';

const Input = React.forwardRef((props, ref) => {
	return (
		<div className="">
			<label className={classes['amount-label']} htmlFor={props.input.id}>
				Amount
			</label>

			{/* passing all proprieties through props.input object */}
			<input
				ref={ref}
				className={classes.amount}
				{...props.input}
				// required
			/>
		</div>
	);
});

export default Input;
