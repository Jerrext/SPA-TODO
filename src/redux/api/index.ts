import axios from 'axios';

const FIRST_API_URL = 'https://65123aeab8c6ce52b3956e61.mockapi.io';
const SECOND_API_URL = '';

const firstApiAxios = axios.create({
  baseURL: FIRST_API_URL,
});

const secondApiAxios = axios.create({
  baseURL: SECOND_API_URL,
});

const getProjectsRequest = () => {
  return firstApiAxios.get(`/projects`);
};

export default { getProjectsRequest };
