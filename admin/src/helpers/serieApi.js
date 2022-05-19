import axios from 'axios';

const rooturl = '/api/series';

export const getAllSeriesApi = async () => {
	const response = await axios.get(rooturl);

	return response;
};

export const getSerieApi = async (fmlink) => {
	const response = await axios.get(`${rooturl}/${fmlink}`);

	return response;
};

export const addSerie = async (formData) => {
	const setToken = localStorage.getItem('token');

	const thisconf = {
		headers: {
			Authorization: `Bearer ${setToken}`,
			'Content-Type': 'application/json',
		},
	};

	const response = await axios.post(rooturl, formData, thisconf);

	return response;
};

export const editSerie = async (formData) => {
	const setToken = localStorage.getItem('token');

	const thisconf = {
		headers: {
			Authorization: `Bearer ${setToken}`,
			'Content-Type': 'application/json',
		},
	};

	const response = await axios.put(rooturl, formData, thisconf);

	return response;
};

export const removeSerie = async (id) => {
	const setToken = localStorage.getItem('token');

	const thisconf = {
		headers: {
			Authorization: `Bearer ${setToken}`,
		},
	};

	const response = await axios.delete(`${rooturl}/${id}`, thisconf);

	return response;
};
