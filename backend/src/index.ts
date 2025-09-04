import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks';
import { TaskController } from './controllers/task.controller';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
app.use(errorHandler);


const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Tasks API: http://localhost:${PORT}/api/tasks`);
  console.log(`Task Stats: http://localhost:${PORT}/api/tasks/stats`);
});

// Graceful shutdown handling
const taskController = new TaskController();

process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  await taskController.disconnect();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  await taskController.disconnect();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export default app;
