import { TaskRepository } from '../repositories/task.repository';
import { CreateTaskRequest, UpdateTaskRequest } from '../types/task';
import { Task } from '@prisma/client';
import { ValidationError, NotFoundError, DatabaseError } from '../types/error';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      return await this.taskRepository.findAll();
    } catch (error) {
      throw new DatabaseError('Failed to fetch tasks');
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findById(id);
      if (!task) {
        throw new NotFoundError('Task not found');
      }
      return task;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to fetch task');
    }
  }

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    try {
      // Validate required fields
      if (!taskData.title || taskData.title.trim().length === 0) {
        throw new ValidationError('Task title is required');
      }

      if (taskData.title.length > 100) {
        throw new ValidationError('Task title must be less than 100 characters');
      }

      if (taskData.description && taskData.description.length > 500) {
        throw new ValidationError('Description must be less than 500 characters');
      }

      // Set default priority if not provided
      const data = {
        ...taskData,
        priority: taskData.priority || 'LOW'
      };

      return await this.taskRepository.create(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new DatabaseError('Failed to create task');
    }
  }

  async updateTask(id: string, updateData: UpdateTaskRequest): Promise<Task> {
    try {
      // Validate the task exists
      const existingTask = await this.taskRepository.findById(id);
      if (!existingTask) {
        throw new NotFoundError('Task not found');
      }

      // Validate update data
      if (updateData.title !== undefined) {
        if (!updateData.title || updateData.title.trim().length === 0) {
          throw new ValidationError('Task title cannot be empty');
        }
        if (updateData.title.length > 100) {
          throw new ValidationError('Task title must be less than 100 characters');
        }
      }

      if (updateData.description !== undefined && updateData.description && updateData.description.length > 500) {
        throw new ValidationError('Description must be less than 500 characters');
      }

      return await this.taskRepository.update(id, updateData);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to update task');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      // Validate the task exists
      const existingTask = await this.taskRepository.findById(id);
      if (!existingTask) {
        throw new NotFoundError('Task not found');
      }

      await this.taskRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete task');
    }
  }

  async getTaskStats(): Promise<{ total: number; completed: number; pending: number }> {
    try {
      return await this.taskRepository.getStats();
    } catch (error) {
      throw new DatabaseError('Failed to fetch task statistics');
    }
  }

  async disconnect(): Promise<void> {
    await this.taskRepository.disconnect();
  }
}
