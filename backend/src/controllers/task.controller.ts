import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskRequest, UpdateTaskRequest } from '../types/task';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  // GET /api/tasks - Retrieve all tasks
  async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/tasks/:id - Retrieve a specific task
  async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await this.taskService.getTaskById(id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/tasks - Create a new task
  async createTask(req: Request<{}, {}, CreateTaskRequest>, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskData = req.body;
      const newTask = await this.taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/tasks/:id - Update a task
  async updateTask(req: Request<{ id: string }, {}, UpdateTaskRequest>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedTask = await this.taskService.updateTask(id, updateData);
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/tasks/:id - Delete a task
  async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // GET /api/tasks/stats - Get task statistics
  async getTaskStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await this.taskService.getTaskStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }

  // Cleanup method for graceful shutdown
  async disconnect(): Promise<void> {
    await this.taskService.disconnect();
  }
}
