const fetchMoviesHandler = useCallback(async function () {
	try {
		setShowLoading(true);
		setError(null);

		// GET request using fetch inside useEffect React hook
		const response = await fetch(
			'https://react-http-a64d3-default-rtdb.firebaseio.com/movies.json'
		);

		// check here before try to get the json data
		if (!response.ok) {
			// and if I throw this error, I'll be sent to the .catch block
			throw new Error('Some error has occurred');
		}

		const data = await response.json();

		let newArray = [];

		for (const key in data) {
			newArray.push({
				key: key,
				movie_title: data[key].movie_title,
				movie_description: data[key].movie_description,
				movie_releaseDate: data[key].movie_releaseDate,
			});
		}

		dispatch({ movies: newArray, type: 'ADD_MOVIE' });

		// after getting the movies show it
		setShowLoading(false);
	} catch (error) {
		// console.log(error.message);
		// error.message
		setError(error.message);
	}
	setShowLoading(false);
}, []);

useEffect(() => {
	fetchMoviesHandler();
}, [fetchMoviesHandler]);