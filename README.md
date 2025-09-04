# Task Manager - Full Stack TypeScript Application

A modern, full-stack task management application built with TypeScript, React, Node.js, and Prisma ORM.

### Run Locally
To run the Task Manager application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Install all dependencies (root, backend, frontend):**
   ```bash
   npm run install:all
   ```

3. **Set up the database:**
   ```bash
   npm run db:setup
   ```

4. **Start the development servers (backend & frontend concurrently):**
   ```bash
   npm run dev
   ```

   - The backend API will be available at `http://localhost:3001`
   - The frontend will be available at `http://localhost:3000`

**Note:**  
- Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- If you encounter database errors, ensure the SQLite file has correct permissions and run `npm run db:setup` again.
- For more granular control, you can start backend and frontend separately using `npm run backend` and `npm run frontend`.

## 🌐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
PORT=3001
```

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete tasks
- **Priority Management**: Set task priorities (Low, Medium, High)
- **Task Filtering**: Filter tasks by status and priority
- **Task Statistics**: View total, completed, and pending task counts
- **Responsive Design**: Mobile-friendly interface
- **Modern UI/UX**: Clean, intuitive design with smooth animations
- **Layered Architecture**: Clean separation of concerns with controllers, services, and repositories

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **Prisma ORM** for database operations
- **SQLite** database (file-based)
- **Layered Architecture**: Controllers → Services → Repositories

### Frontend
- **React 18** with **TypeScript**
- **Modern CSS** with responsive design
- **Axios** for HTTP requests
- **State management** with React hooks

## 📁 Project Structure

```
task-manager/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # HTTP request handlers
│   │   ├── services/       # Business logic layer
│   │   ├── repositories/   # Data access layer
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # Error handling & middleware
│   │   ├── types/          # TypeScript interfaces
│   │   └── index.ts        # Main server file
│   ├── prisma/             # Database schema and migrations
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main application component
│   └── package.json        # Frontend dependencies
└── README.md               # This file
|__ TEST_PLAN.md            # Test plan
```

## 🏗️ Architecture Overview

### Backend Layers

1. **Controllers** (`/controllers/`)
   - Handle HTTP requests and responses
   - Input validation and sanitization
   - Call appropriate service methods
   - Pass errors to error handling middleware

2. **Services** (`/services/`)
   - Business logic implementation
   - Data validation rules
   - Orchestrate repository operations
   - Handle business-specific errors

3. **Repositories** (`/repositories/`)
   - Data access layer
   - Database operations via Prisma
   - Raw data manipulation
   - Database-specific error handling

4. **Middleware** (`/middleware/`)
   - Global error handling
   - Request/response processing
   - Authentication (future enhancement)
   - Logging and monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## 📊 API Endpoints

### Tasks
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/:id` - Retrieve a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task (status, details)
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats` - Return task statistics (total, completed, pending)

### Health Check
- `GET /health` - Server health status

## 🎨 UI Components

- **TaskForm**: Add new tasks with validation
- **Task**: Individual task display with actions
- **App**: Main dashboard with filtering and state management

## 🔧 Run Code Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
PORT=3001
```

### Frontend
The frontend automatically connects to `http://localhost:3001` for the API.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

### Backend
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Set appropriate environment variables

### Frontend
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service

### Common Issues

1. **Database connection errors**: Ensure the SQLite file has proper permissions
2. **CORS errors**: Check that the backend is running and CORS is properly configured
3. **Port conflicts**: Change the PORT in backend .env file if 3001 is occupied

### Getting Help

- Check the console for error messages
- Verify both frontend and backend are running
- Ensure database is properly initialized with `npx prisma db push`
