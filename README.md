# 🚀 CoBuilder - Find Your Cofounder

**CoBuilder** is a comprehensive platform for matching founders based on complementary skills and building teams together.

## ✨ Features

### 🎯 Core Features
- **Cofounder Matching** - AI-powered swipe matching based on compatibility
- **Doer Score** - Verify actual builders with task completion tracking
- **Smart Matching** - AI analyzes skills and personality fit
- **Real-time Chat** - Team communication with Socket.io

### 🤝 Team Management
- **Team Dashboard** - Manage members and track progress
- **Task Management** - Smart task assignment
- **Progress Tracking** - Real-time team analytics
- **Team Chat** - Built-in messaging

### 🚀 Startup Features
- **Landing Page Builder** - No-code startup website builder
- **Lead Capture** - Collect leads directly
- **Analytics** - Track page views and conversions
- **Product Showcase** - Display products and pricing

### 💰 Funding
- **Funding Rounds** - Create Seed/Series A/B/C rounds
- **Investor Matching** - Find investors automatically
- **Deal Tracking** - Track investments

### 👨‍🏫 Mentorship
- **Mentor Network** - Connect with experienced founders
- **Skill Verification** - Test and verify skills
- **Equity Agreements** - Smart contracts for cofounders

### 📊 Analytics
- **Leaderboard** - Top 100 builders by doer score
- **Team Analytics** - Track productivity
- **Growth Insights** - Actionable recommendations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Socket.io** - Real-time communication
- **JWT** - Authentication

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - API calls
- **Socket.io Client** - Real-time updates

### DevOps
- **Docker** - Containerization
- **MongoDB Atlas** - Cloud database
- **Heroku/Vercel** - Deployment

## 📋 Prerequisites

- Node.js 14+ 
- MongoDB Atlas account
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd cofounder-platform
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cofounder-app

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
```

### 4. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Socket.io**: http://localhost:5000

## 📝 Default Test Accounts

You need to register your own account. No demo accounts provided for security.

**Steps to test:**
1. Click "Register"
2. Create account with email & password
3. Add skills, experience level, availability
4. Start swiping to find cofounders!

## 📚 API Documentation

### Authentication

```bash
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

### Users

```bash
GET /api/users/profile
PUT /api/users/profile
GET /api/users/swipe-candidates
GET /api/users/:userId
```

### Matching

```bash
POST /api/matching/swipe
GET /api/matching/my-matches
POST /api/matching/:matchId/assign-trial
```

### Teams

```bash
POST /api/teams/create
GET /api/teams/:teamId
POST /api/teams/:teamId/chat
GET /api/teams/user/:userId
```

### Tasks

```bash
POST /api/tasks/create
PUT /api/tasks/:taskId
GET /api/tasks/team/:teamId
PUT /api/tasks/:taskId/progress
```

### Startups

```bash
POST /api/startups/create
PUT /api/startups/:startupId/landing-page
POST /api/startups/:startupId/products
GET /api/startups/:startupId/analytics
```

### More Endpoints

- **Skills**: `/api/skills/*`
- **Mentorship**: `/api/mentorship/*`
- **Funding**: `/api/funding/*`
- **Leaderboard**: `/api/leaderboard/*`
- **Admin**: `/api/admin/*`

## 🐳 Docker Deployment

### Build Images

```bash
docker-compose build
```

### Run Services

```bash
docker-compose up
```

### Stop Services

```bash
docker-compose down
```

## ☁️ Production Deployment

### Deploy Backend (Heroku)

```bash
cd backend
heroku login
heroku create your-app-name
heroku config:set MONGO_URI=<your-mongodb-uri>
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
cd frontend
npm run build
vercel
```

## 📁 Project Structure

