import classes from './AddItemFormBtn.module.css';

const AddItemFormBtn = (props) => {
	return (
		<button {...props} className={classes.btn}>
			Add Item
		</button>
	);
};

export default AddItemFormBtn;
