# TaskBridge — Collaborative Task Management App

> Built by **Vivek Padhiyar** · MERN Stack Intern Assessment

## 🚀 Tech Stack
- **Backend**: Node.js v18+, Express.js, MongoDB Atlas, Mongoose, JWT, bcrypt, cors, dotenv
- **Frontend**: React 18 (Vite), React Router v6, Axios, react-beautiful-dnd, plain CSS

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/taskbridge.git
cd taskbridge

cd backend && npm install
cd ../frontend && npm install
```

### 2. Backend Environment Variables

Create `backend/.env` (copy from `backend/.env.example`):

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/taskbridge?retryWrites=true&w=majority
JWT_SECRET=your_strong_jwt_secret_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Run Locally (two terminals)

```bash
# Terminal 1
cd backend && npm run dev     # → http://localhost:5000

# Terminal 2
cd frontend && npm run dev    # → http://localhost:5173
```

---

## 🌐 Deployment

### Backend → Render (render.com)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set **Root Directory**: `backend`
5. **Build Command**: `npm install`
6. **Start Command**: `npm start`
7. Add these **Environment Variables** in Render dashboard:

| Key | Value |
|-----|-------|
| `MONGO_URI` | your Atlas connection string |
| `JWT_SECRET` | any long random string |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | your Vercel frontend URL (after deploying frontend) |

8. Deploy — copy the URL e.g. `https://taskbridge-api.onrender.com`

---

### Frontend → Vercel (vercel.com)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Set **Root Directory**: `frontend`
4. **Framework Preset**: Vite
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Add this **Environment Variable**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | your Render backend URL (e.g. `https://taskbridge-api.onrender.com`) |

8. Deploy — your app is live!

> **Important**: After deploying frontend, go back to Render and set `CLIENT_URL` to your Vercel URL, then redeploy the backend.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | `{ name, email, password }` | Register new user |
| POST | `/api/auth/login` | `{ email, password }` | Login, returns JWT |

### Tasks *(JWT required — `Authorization: Bearer <token>`)*
| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/api/tasks` | — | Get all tasks for logged-in user |
| GET | `/api/tasks?status=todo` | — | Filter by status |
| POST | `/api/tasks` | `{ title, description?, status?, priority?, dueDate? }` | Create task |
| PUT | `/api/tasks/:id` | any task fields | Update task |
| DELETE | `/api/tasks/:id` | — | Delete task |

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

---

## ✨ Features

- ✅ JWT Authentication (register / login / logout)
- ✅ Kanban board (To Do / In Progress / Done)
- ✅ Drag-and-drop between columns
- ✅ Task CRUD (title, description, status, priority, due date)
- ✅ Dark / Light mode toggle (persists to localStorage)
- ✅ Due date countdown & overdue highlighting
- ✅ Protected routes
- ✅ Loading & error states
- ✅ Responsive (mobile + desktop)

---

## 📸 Screenshots

> *(Add after deployment)*

---

*Crafted with ♥ by Vivek Padhiyar*
