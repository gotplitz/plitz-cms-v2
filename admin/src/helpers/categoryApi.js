import axios from 'axios';

const rooturl = '/api/categories';

export const getAllCategoriesApi = async () => {
	const response = await axios.get(rooturl);

	return response;
};

export const getCategoryApi = async (fmlink) => {
	const response = await axios.get(`${rooturl}/${fmlink}`);

	return response;
};

export const addCategory = async (formData) => {
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

export const editCategory = async (formData) => {
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

export const removeCategory = async (id) => {
	const setToken = localStorage.getItem('token');

	const thisconf = {
		headers: {
			Authorization: `Bearer ${setToken}`,
		},
	};

	const response = await axios.delete(`${rooturl}/${id}`, thisconf);

	return response;
};
