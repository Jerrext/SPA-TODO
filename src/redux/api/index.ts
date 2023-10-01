import axios from 'axios';
import { ProjectPayload } from '../types/projectsTypes';

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

const createSingleProjectRequest = (data: ProjectPayload) => {
  return firstApiAxios.post(`/projects`, data);
};

const deleteSingleProjectRequest = (id: number) => {
  return firstApiAxios.delete(`/projects/${id}`);
};

const getSingleProjectRequest = (id: number) => {
  return firstApiAxios.get(`/projects/${id}`);
};

const updateSingleProjectRequest = (id: number, data: ProjectPayload) => {
  return firstApiAxios.put(`/projects/${id}`, data);
};

const getTasksListRequest = (id: number) => {
  return firstApiAxios.get(`/projects/${id}/tasks`);
};

export default {
  getProjectsRequest,
  createSingleProjectRequest,
  deleteSingleProjectRequest,
  getSingleProjectRequest,
  updateSingleProjectRequest,
  getTasksListRequest,
};
