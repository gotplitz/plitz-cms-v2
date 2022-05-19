import axios from 'axios';

const rooturl = '/api/blogposts';

export const getAllBlogpostsApi = async () => {
	const response = await axios.get(rooturl);

	return response;
};

export const getBlogpostApi = async (fmlink) => {
	const response = await axios.get(`${rooturl}/${fmlink}`);

	return response;
};

export const addBlogpost = async (formData) => {
	const setToken = localStorage.getItem('token');

	const confuno = {
		headers: {
			Authorization: `Bearer ${setToken}`,
			'Content-Type': 'application/json',
		},
	};

	const response = await axios.post(rooturl, formData, confuno);

	return response;
};

export const editBlogpost = async (formData) => {
	const setToken = localStorage.getItem('token');

	const confdos = {
		headers: {
			Authorization: `Bearer ${setToken}`,
			'Content-Type': 'application/json',
		},
	};

	const response = await axios.put(rooturl, formData, confdos);

	return response;
};

export const removeBlogpost = async (id) => {
	const setToken = localStorage.getItem('token');

	const conftres = {
		headers: {
			Authorization: `Bearer ${setToken}`,
		},
	};

	const response = await axios.delete(`${rooturl}/${id}`, conftres);

	return response;
};
