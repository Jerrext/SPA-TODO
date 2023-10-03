import axios from 'axios';
import { ProjectData } from '../types/projectsTypes';
import { CreateTaskData, CreateTaskPayload } from '../types/boardTypes';

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

const createSingleProjectRequest = (data: ProjectData) => {
  return firstApiAxios.post(`/projects`, data);
};

const deleteSingleProjectRequest = (id: number) => {
  return firstApiAxios.delete(`/projects/${id}`);
};

const getSingleProjectRequest = (id: number) => {
  return firstApiAxios.get(`/projects/${id}`);
};

const updateSingleProjectRequest = (id: number, data: ProjectData) => {
  return firstApiAxios.put(`/projects/${id}`, data);
};

const getTasksListRequest = (id: number) => {
  return firstApiAxios.get(`/projects/${id}/tasks`);
};

const createTaskRequest = (id: number, data: CreateTaskData) => {
  return firstApiAxios.post(`/projects/${id}/tasks`, data);
};

const deleteTaskRequest = (projectId: number, taskId: number) => {
  return firstApiAxios.delete(`/projects/${projectId}/tasks/${taskId}`);
};

export default {
  getProjectsRequest,
  createSingleProjectRequest,
  deleteSingleProjectRequest,
  getSingleProjectRequest,
  updateSingleProjectRequest,
  getTasksListRequest,
  createTaskRequest,
  deleteTaskRequest,
};
