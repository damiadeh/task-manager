export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority?: Priority;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: Priority;
  completed?: boolean;
}