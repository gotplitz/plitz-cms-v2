import axios from 'axios';

const url = '/api/users/login';
const urlget = '/api/users/profile';
const urlchange = '/api/users/forgot';
const urlreg = '/api/users';
const urlnewpass = '/api/users/change';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const loginUserApi = async (formData) => {
  const response = await axios.post(url, formData, config);

  return response;
};

export const registerUserApi = async (formData) => {
  const response = await axios.post(urlreg, formData, config);

  return response;
};

export const getUserApi = async () => {
  const setToken = localStorage.getItem('token');

  const thisconf = {
    headers: {
      Authorization: `Bearer ${setToken}`,
    },
  };

  const response = await axios.get(urlget, thisconf);

  return response;
};

export const changePassApi = async (email) => {
  const response = await axios.post(urlchange, email, config);

  return response;
};

export const newPassApi = async (formData) => {
  const thisconf = {
    headers: {
      Authorization: `Bearer ${formData.token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.put(urlnewpass, formData, thisconf);

  return response;
};
