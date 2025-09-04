import axios from 'axios';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/Task';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export const taskApi = {
  async getTasks(): Promise<Task[]> {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  },

  async getTask(id: string): Promise<Task> {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  },

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  },

  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  },

  async getTaskStats(): Promise<TaskStats> {
    const response = await axios.get(`${API_BASE_URL}/tasks/stats`);
    return response.data;
  }
};
