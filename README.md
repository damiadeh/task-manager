# 🚀 Task Manager

A full-stack TypeScript task management application built with React frontend and Node.js backend, featuring modern web technologies and a clean, responsive UI.

## 🎥 Demo

Watch the Task Manager in action: **[Demo Video](https://www.loom.com/share/cc25dc6638284f50b868d5494c38f17c?sid=5712f48f-6e6f-4674-b42f-de00bca3a5c5)**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up the database**
   ```bash
   npm run db:setup
   ```

4. **Seed with sample data (optional)**
   ```bash
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

Your application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Note**: .env file is not ignored for this assessment sake.

### Sample Data
The seeding script creates 2 sample tasks to help you get started:
-  **Welcome to Task Manager!** - A completed high-priority task
-  **Explore the Features** - A pending medium-priority task

## ✨ Features

- **📝 Task Management**: Create, read, update, and delete tasks
- **🎯 Priority Levels**: Set task priorities (Low, Medium, High)
- **✅ Completion Tracking**: Mark tasks as complete/incomplete
- **📊 Real-time Statistics**: Live task counts and statistics
- **🎨 Modern UI**: Beautiful, responsive design with animations
- **🔍 Smart Filtering**: Filter by status and priority
- **📱 Mobile Responsive**: Works perfectly on all devices
- **⚡ Real-time Updates**: Instant UI updates with smooth animations

## 🏗️ Architecture

### Backend (Node.js + Express + TypeScript)
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and data validation
- **Repositories**: Database interactions using Prisma ORM
- **Middleware**: Error handling and CORS configuration
- **Database**: SQLite with Prisma ORM

### Frontend (React + TypeScript)
- **Components**: Modular, reusable UI components
- **Hooks**: React hooks for state management
- **Services**: API integration with Axios
- **Styling**: Modern CSS with animations and responsive design

## 📁 Project Structure

```
task-manager/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── repositories/   # Data access layer
│   │   ├── middleware/     # Error handling & CORS
│   │   ├── routes/         # API route definitions
│   │   ├── types/          # TypeScript interfaces
│   │   └── index.ts        # Server entry point
│   ├── prisma/             # Database schema & migrations
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main application component
│   ├── public/              # Static assets
│   └── package.json        # Frontend dependencies
├── package.json             # Root package.json with scripts
├── render.yaml              # Render deployment configuration
├── DEPLOYMENT.md            # Detailed deployment guide
└── README.md               # This file
|__ TEST_PLAN.md            # Test plan
```

## 🛠️ Available Scripts

### Root Level
```bash
npm run install:all    # Install both frontend and backend dependencies
npm run dev            # Start both frontend and backend in development mode
npm run build          # Build both frontend and backend for production
npm run backend        # Start only the backend server
npm run frontend       # Start only the frontend development server
npm run db:setup       # Set up the database and generate Prisma client
npm run db:studio      # Open Prisma Studio for database management
```

### Backend
```bash
cd backend
npm run dev            # Start development server with nodemon
npm run build          # Build TypeScript to JavaScript
npm run start          # Start production server
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes to database
npm run db:studio      # Open Prisma Studio
```

### Frontend
```bash
cd frontend
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests
npm run eject          # Eject from Create React App
```

## 🌐 API Endpoints

### Base URL: `http://localhost:3001/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Retrieve all tasks |
| `GET` | `/tasks/stats` | Get task statistics (total, completed, pending) |
| `GET` | `/tasks/:id` | Retrieve a specific task |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |
| `GET` | `/health` | Health check endpoint |

### Task Object Structure
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🎨 UI Features

### Task Management
- **Create Tasks**: Form with title, description, and priority
- **Edit Tasks**: Inline editing for task details
- **Complete Tasks**: Checkbox to mark tasks as done
- **Delete Tasks**: Remove tasks with confirmation

### Visual Enhancements
- **Smooth Animations**: Slide-down effects for completed tasks
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Clean, professional appearance
- **Interactive Elements**: Hover effects and transitions

### Filtering & Organization
- **Status Filters**: All, Pending, Completed
- **Priority Filters**: High Priority tasks
- **Real-time Counts**: Live statistics on filter buttons
- **Smart Sorting**: Uncompleted tasks first, then by creation date

## 🚀 Deployment

### Render
This application is configured for deployment on Render.

**Pricing Breakdown:**
- **Frontend**: Free (Static Site)
- **Backend**: $7/month (Web Service - Starter Plan)
- **Total Cost**: $7/month for full-stack application

**Quick Deploy:**
1. Push your code to GitHub
2. Connect your repository to Render
3. Use the `render.yaml` configuration for automatic setup
4. Your app will be live in minutes!

**Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions.

### Free Alternatives
If you prefer $0 hosting:
- **Frontend**: Render (free) + **Backend**: Railway (free tier)
- **Frontend**: Vercel (free) + **Backend**: Supabase (free tier)
- **Frontend**: Netlify (free) + **Backend**: Render (free tier)

### Environment Variables
```bash
# Backend
DATABASE_URL="file:./dev.db"

# Frontend
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## 🔧 Development

### Database
- **SQLite**: File-based database for development
- **Prisma ORM**: Type-safe database operations
- **Migrations**: Automatic schema management
- **Studio**: Visual database browser

### TypeScript
- **Strict Mode**: Full type safety
- **Interfaces**: Shared types between frontend and backend
- **Generics**: Type-safe API responses
- **Error Handling**: Custom error types and middleware

### Testing
- **API Testing**: Test backend endpoints
- **Component Testing**: Test React components
- **Integration Testing**: Test full user workflows
- **Error Scenarios**: Test error handling and edge cases

## 📊 Performance

### Backend
- **Express.js**: Fast, minimal web framework
- **Prisma**: Optimized database queries
- **CORS**: Configurable cross-origin requests
- **Error Handling**: Graceful error responses

### Frontend
- **React 18**: Latest React features
- **Optimized Builds**: Production-ready builds
- **Lazy Loading**: Code splitting for better performance
- **Responsive Images**: Optimized for all screen sizes

## 🚨 Error Handling

### Backend Errors
- **Validation Errors**: Input validation with clear messages
- **Database Errors**: Graceful database operation failures
- **Not Found Errors**: Proper 404 responses
- **Global Error Handler**: Consistent error responses

### Frontend Errors
- **API Errors**: User-friendly error messages
- **Network Errors**: Offline handling and retry logic
- **Validation Errors**: Form validation with helpful feedback
- **Error Boundaries**: Graceful error recovery

## 🔒 Security

- **CORS Configuration**: Restrict cross-origin requests
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Environment Variables**: Secure configuration management

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting section](./DEPLOYMENT.md#troubleshooting)
2. Review the [deployment guide](./DEPLOYMENT.md)
3. Check the application logs
4. Verify environment variables
5. Test locally before deploying

## 🎯 Roadmap

- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] File attachments for tasks
- [ ] Task deadlines and reminders
- [ ] Team collaboration features
- [ ] Advanced search and filtering
- [ ] Data export and backup
- [ ] Mobile app (React Native)

---

**Happy Task Managing! 🎉**
