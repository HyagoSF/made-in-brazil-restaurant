import classes from './Input.module.css';

const Input = (props) => {
	return (
		<div className="">
			<label className={classes['amount-label']} htmlFor="amount">
				Amount
			</label>

			{/* passing all proprieties through props.input object */}
			<input className={classes.amount} {...props.input} />
		</div>
	);
};

export default Input;
