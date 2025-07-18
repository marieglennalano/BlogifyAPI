# 📝 Blogify - MERN Stack Blog Application

**Blogify** is a full-stack blog app built using the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to register, log in, and create, edit, or delete their own blog posts. Admins have extended privileges. The backend API includes secure authentication, role-based access, and clean REST endpoints.

---

## 🌐 Deployed API

**Base URL:**  
`https://blogifyapi-ueu8.onrender.com`

---

## 📦 Tech Stack

- Node.js + Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Google OAuth 2.0
- bcrypt (for password hashing)
- dotenv
- CORS

---

## 🚀 Features

### 👤 Users
- Register and log in
- Update profile and change password
- Access personal info securely

### 📝 Blog Posts
- Create, view, update, and delete blog posts
- Each post includes title, content, author, and timestamps
- Only post authors or admins can modify or delete

### 💬 Comments
- Comment on any blog post
- View comments on blog posts
- Admins can remove any comment

### 🛡️ Admin
- Can manage all blog posts
- Can delete any comment

---

## 📁 Project Structure

```
server/
├── controllers/ # Route handlers (users, blogs, comments)
├── middleware/ # Auth & error middleware
├── models/ # Mongoose schemas
├── routes/ # Route declarations
├── index.js # Main entry point
├── .env # Environment variables
├── package.json
└── README.md
```

---

## 🔐 Authentication

- JWT-based login and protected routes
- Token must be sent via HTTP headers:

```
Authorization: Bearer <your_token>
```

---

## 🧪 Sample Credentials

### 👤 Regular User
```
Email: user1@email.com
Password: user1234
```

### 👑 Admin User
```
Email: admin@email.com
Password: admin1234
```

> Note: You may manually insert these into your MongoDB or register them via the `/users/register` endpoint. To make a user an admin, set `isAdmin: true` directly in MongoDB.

---

## ⚙️ Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/blogify.git
cd blogify/server
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file in `server/` folder:**

```env
PORT=4000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
```

4. **Start the backend server:**

```bash
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Authentication Routes

Method	Endpoint	Description
POST	/users/register	Register a new user
POST	/users/login	Login with email/pass
POST	/users/google-login	Login via Google OAuth
GET	/users/profile	Get user profile (auth)

---

### 📝 Blog Routes

Method	Endpoint	Description
POST	/blogs/create	Create new blog (auth)
GET	/blogs/all	Get all blog posts
GET	/blogs/:id	Get blog by ID
PATCH	/blogs/:id	Update blog (auth)
DELETE	/blogs/:id	Delete blog (auth)
---

### 💬 Comment Routes

Method	Endpoint	Description
POST	/comments/:blogId	Add comment to a blog
PATCH	/comments/:commentId	Edit a comment (auth)
DELETE	/comments/:commentId	Delete a comment (auth)

---

## ✅ Example Token Header

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
```

---

🛡️ Google OAuth Setup
Go to Google Cloud Console

Create a new project

Enable OAuth 2.0 APIs

Add a new OAuth Client ID for Web

Authorized origin: http://localhost:3000 (or your frontend domain)

Copy Client ID to .env as GOOGLE_CLIENT_ID

---

## 💡 Author

Made with ❤️ by Marie Glenn Alano  
[GitHub Profile](https://github.com/marieglennalano)
