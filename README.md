# DevHub — Developer Social Platform

DevHub is a modern full-stack developer social platform where developers can create portfolios, showcase projects, publish technical blogs, and connect with the community.

Built for the Mini Hackathon Sprint using the MERN stack.

---

# Live Demo

Frontend:
[https://your-vercel-link.vercel.app](https://devhub-lemon.vercel.app/)

Backend:
[https://your-render-link.onrender.com](https://devhub-4p4x.onrender.com)

---

# Features

## Authentication
- User signup & login
- JWT authentication
- Protected routes
- Password hashing with bcrypt

## Developer Profiles
- Profile picture upload
- Cover image upload
- Bio & skills section
- Portfolio showcase
- Social identity system

## Projects
- Create projects
- Upload project thumbnails
- Tech stack tags
- GitHub & live links
- Delete own projects
- Like system
- Dynamic project details page

## Blogs
- Publish technical blogs
- Dynamic blog feed
- Author profiles
- Delete own blogs

## Explore
- Search developers
- Search projects
- Filter by tech stack
- Community discovery system

## UI/UX
- Premium modern UI
- Fully responsive
- GSAP motion animations
- Glassmorphism aesthetics
- Smooth transitions

---

# Tech Stack

## Frontend
- React
- React Router
- Tailwind CSS
- GSAP
- Axios
- React Hook Form
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Cloudinary

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# Folder Structure

```bash
DevHub/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Environment Variables

## Server (.env)

```env
PORT=3000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/devhub.git
```

## Install Frontend

```bash
cd client
npm install
```

## Install Backend

```bash
cd server
npm install
```

---

# Run Development Servers

## Frontend

```bash
npm run dev
```

## Backend

```bash
npm start
```

---

# API Endpoints

## Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

## Projects
- GET `/api/projects/all`
- GET `/api/projects/:id`
- POST `/api/projects`
- DELETE `/api/projects/:id`
- PUT `/api/projects/like/:id`

## Blogs
- GET `/api/blogs`
- POST `/api/blogs`
- DELETE `/api/blogs/:id`

## Uploads
- POST `/api/upload/profile-picture`
- POST `/api/upload/cover-image`

## Search
- GET `/api/search?q=react`

---

# Deployment

## Frontend
Deployed on Vercel.

## Backend
Deployed on Render.

---

# Future Improvements
- Comments system
- Save/bookmark projects
- Follow developers
- Notifications
- Realtime chat
- Markdown blog editor

---

# Author

Harshit Raghuwanshi

Built during Mini Hackathon Sprint.
