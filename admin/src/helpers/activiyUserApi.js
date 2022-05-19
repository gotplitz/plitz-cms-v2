import axios from 'axios';

const rooturl = '/api/logs';

export const getActivityApi = async () => {
	const response = await axios.get(rooturl);

	return response;
};

export const postActivityApi = async (formData) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const response = await axios.post(rooturl, formData, config);

	return response;
};
