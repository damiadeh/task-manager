#!/bin/bash

# 🚀 Task Manager Render Deployment Helper
# This script helps prepare your application for Render deployment

echo "🚀 Preparing Task Manager for Render deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "ERROR: Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "ERROR: Git remote origin not set. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/task-manager.git"
    exit 1
fi

echo "✅ Git repository configured"

# Set up database and seed with sample data
echo "🗄️ Setting up database..."
npm run db:setup
if [ $? -ne 0 ]; then
    echo "ERROR: Database setup failed"
    exit 1
fi

echo "🌱 Seeding database with sample tasks..."
npm run db:seed
if [ $? -ne 0 ]; then
    echo "ERROR: Database seeding failed"
    exit 1
fi

# Build the application
echo "🔨 Building application..."

# Build backend
echo "📦 Building backend..."
cd backend
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Backend build failed"
    exit 1
fi
cd ..

# Build frontend-app
echo "📦 Building frontend-app..."
cd frontend-app
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: frontend-app build failed"
    exit 1
fi
cd ..

echo "✅ Application built successfully"

# Check for required files
echo "🔍 Checking deployment files..."

required_files=("render.yaml" "DEPLOYMENT.md" "README.md")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "ERROR: Required file missing: $file"
        exit 1
    fi
done

echo "✅ All required files present"

# Check git status
echo "📊 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Consider committing them:"
    git status --short
    echo ""
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "ERROR: Deployment cancelled"
        exit 1
    fi
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "🚀 Prepare for Render deployment with sample data" 2>/dev/null || echo "No changes to commit"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully"
else
    echo "ERROR: Failed to push to GitHub"
    exit 1
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://render.com"
echo "2. Sign up/Login with your GitHub account"
echo "3. Click 'New +' → 'Blueprint'"
echo "4. Connect your task-manager repository"
echo "5. Render will automatically detect render.yaml"
echo "6. Click 'Create New Environment Instance'"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo "🌐 Your app will be live in minutes!"
echo ""
echo "💡 Your database now contains 2 sample tasks:"
echo "   ✅ Welcome to Task Manager! (Completed)"
echo "   ⏳ Explore the Features (Pending)"
