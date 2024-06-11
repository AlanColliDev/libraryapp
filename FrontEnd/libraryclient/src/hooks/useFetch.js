import { useState, useEffect } from 'react';

export const useFetch = (url) => {

	const [state, setState] = useState({
		data: [],
		isLoading: true,
		hasError: null
	});
	
	useEffect(() => {
		async function getData() {
			try {
				setState(state => {
					return {
						...state,
						isLoading: true
					}
				});
				if(url === "") return;
				const response = await fetch(url);
				const data = await response.json();

				setState({
					data: [...data],
					isLoading: false,
					hasError: null
				});
			} catch (error) {
				setState({
					data: [],
					isLoading: false,
					hasError: error
				});
			}
		}
		getData();
	}, [url]);

	return {
		data: state.data,
		isLoading: state.isLoading,
		hasError: state.hasError,
		setState
	}
};