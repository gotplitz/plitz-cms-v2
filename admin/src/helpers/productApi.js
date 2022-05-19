import axios from 'axios';

const rooturl = '/api/products';

export const getAllProductsApi = async () => {
	const response = await axios.get(rooturl);

	return response;
};

export const getProdsPrevsApi = async () => {
	const response = await axios.get(`${rooturl}/previews`);

	return response;
};

export const getImageApi = async (id) => {
	const response = await axios.get(`${rooturl}/image/${id}`);

	return response.data.data;
};

export const getProductApi = async (fmlink) => {
	const response = await axios.get(`${rooturl}/single/${fmlink}`);

	return response;
};

export const addProduct = async (formData) => {
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

export const editProduct = async (formData) => {
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

export const removeProduct = async (id) => {
	const setToken = localStorage.getItem('token');

	const thisconf = {
		headers: {
			Authorization: `Bearer ${setToken}`,
		},
	};

	const response = await axios.delete(`${rooturl}/${id}`, thisconf);

	return response;
};
