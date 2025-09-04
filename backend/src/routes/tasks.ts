import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();
const taskController = new TaskController();

// GET /api/tasks - Retrieve all tasks
router.get('/', (req, res, next) => taskController.getAllTasks(req, res, next));

// GET /api/tasks/stats - Get task statistics
router.get('/stats', (req, res, next) => taskController.getTaskStats(req, res, next));

// GET /api/tasks/:id - Retrieve a specific task
router.get('/:id', (req, res, next) => taskController.getTaskById(req, res, next));

// POST /api/tasks - Create a new task
router.post('/', (req, res, next) => taskController.createTask(req, res, next));

// PUT /api/tasks/:id - Update a task
router.put('/:id', (req, res, next) => taskController.updateTask(req, res, next));

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', (req, res, next) => taskController.deleteTask(req, res, next));

export default router;
