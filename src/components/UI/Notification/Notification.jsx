const Notification = (props) => {
	const { status, title, message } = props;

	console.log('Notification.jsx: status: ', status);

	return (
		<div className={`notification ${type}`}>
			<p>{message}</p>
		</div>
	);
};

export default Notification;
