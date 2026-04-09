# PlaceTrack AI

[![Run Locally](https://img.shields.io/badge/Run-Local-brightgreen?style=for-the-badge)](https://github.com/sanketchute17-ctrl/PlaceTrack-AI-)
[![Vite](https://img.shields.io/badge/Built%20with-Vite-yellow?style=for-the-badge)](https://vitejs.dev/)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

PlaceTrack AI is a modern placement management dashboard built with a React + Vite frontend and a Node.js + Express backend. It is designed to manage student profiles, company placements, interviews, and recruitment analytics. The backend can connect to Supabase PostgreSQL as the database.

## What this project is for

This project is built to simulate a placement management ecosystem for colleges and training institutions. It includes:

- role-based authentication for students, companies, and admins
- student profile management and placement tracking
- company listings, eligibility, and package management
- interview scheduling and analytics dashboard
- resume/ATS checking and candidate scoring
- responsive UI with modern cards, charts, and animations

## Architecture

The repository is split into two main parts:

- `src/` - React frontend app using Vite
- `server/` - Node.js backend using Express and Supabase/PostgreSQL

### Frontend

- `src/App.jsx` - main app entry
- `src/pages/` - page screens for login, dashboard, students, companies, internships, reports, and settings
- `src/components/` - reusable UI components
- `src/context/AuthContext.jsx` - authentication state, login/register handlers

### Backend

- `server/server.js` - Express server and API routes
- `server/controllers/` - business logic for auth, company, student, placement operations
- `server/models/` - database models and schemas
- `server/routes/` - API route definitions
- `server/config/db.js` - database connection setup
- `server/supabase_schema.sql` - SQL schema for Supabase tables

## Features

- User registration and JWT login
- Role validation for student/company/admin access
- Supabase database integration for users, students, companies, placements
- CRUD APIs for students, companies, placements
- Interactive dashboard and analytics components
- Animated login UI with account tier selection
- Local storage token persistence for auth

## Prerequisites

- Node.js 18+ installed
- npm available
- Optional: a GitHub repository for code hosting
- Optional: Supabase project if you want real database storage

## Setup

1. Clone this repository locally (if not already):
   ```bash
   git clone https://github.com/sanketchute17-ctrl/PlaceTrack-AI-.git
   cd PlaceAI
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

## Run commands

Use these commands to start and test the app:

- Start frontend development server:
  ```bash
  npm run dev
  ```
- Build frontend for production:
  ```bash
  npm run build
  ```
- Preview frontend production build:
  ```bash
  npm run preview
  ```
- Start backend API server:
  ```bash
  cd server
  node server.js
  ```
- Start both servers in separate terminals:
  Terminal 1:
  ```bash
  npm run dev
  ```
  Terminal 2:
  ```bash
  cd server
  node server.js
  ```

## Environment variables

Create a `.env` file inside the `server/` directory with values like this:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

> If you are not using Supabase, you will need to modify the backend to another database or add local DB support.

## Running the app

### Start the backend

From the `server/` folder:

```bash
cd server
node server.js
```

This starts the API server on `http://localhost:5000`.

### Start the frontend

From the root project folder:

```bash
npm run dev
```

This starts the Vite frontend on `http://localhost:5174` by default.

## Common commands

- `npm run dev` - start the frontend in development mode
- `npm run build` - create a production build for the frontend
- `npm run preview` - preview the production build locally
- `cd server && node server.js` - start the backend API server

## How to use

1. Open the frontend in the browser.
2. Register a new account under the appropriate role (Student, Company, Admin).
3. Login with the registered user.
4. Use the dashboard to review placement data and student records.
5. Add or manage companies, placements, and students through the app.

## Supabase schema

If using Supabase, run the SQL in `server/supabase_schema.sql` to create the required tables:

- `users`
- `students`
- `companies`
- `placements`

## Deployment notes

- Frontend can be deployed with Vercel, Netlify, or any static hosting provider.
- Backend can be deployed with Render, Railway, Heroku, or any Node.js host.
- Make sure to configure environment variables in the deployment service.

## Important files

- `README.md` - project documentation
- `package.json` - frontend package configuration
- `server/package.json` - backend package configuration
- `server/server.js` - backend routing and API logic
- `src/App.jsx` - frontend root component
- `src/context/AuthContext.jsx` - auth logic used by the frontend

## Why this project exists

PlaceTrack AI is built as a placement management portal that helps educational institutions manage student placements, recruiter pipelines, interview scheduling, and analytics in one place. It is ideal for demoing a full-stack application with real user roles and database integration.

## How to contribute

If you want to improve this project, follow these steps:

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/PlaceTrack-AI-.git
   cd PlaceAI
   ```
3. Create a new feature branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```
4. Make your code changes and test them.
5. Stage and commit your work:
   ```bash
   git add .
   git commit -m "Add feature: describe what changed"
   ```
6. Push your branch:
   ```bash
   git push origin feature/my-new-feature
   ```
7. Open a pull request on GitHub and describe the improvement clearly.

Suggested contributions:

- fix bugs in frontend or backend
- improve UI/UX for login and dashboard
- add new role permissions or features
- optimize API performance and validation
- improve documentation, installation, or deployment guides

## Contact

If you need help or want to improve the project, open an issue in the repository or message the owner.
