export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  completed?: boolean;
}
