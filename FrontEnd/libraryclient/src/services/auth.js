import {cnf} from '../environment/config';

export const Auth = async( payload ) => {
		const url = `${cnf.URI_SERVER}${cnf.ENDPOINT_AUTH}/Login`;
		const request = await fetch(url, {
			headers: {
				'Content-Type' : 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(payload)
		}).catch(error => {
			return error;
		});
		return request;
};