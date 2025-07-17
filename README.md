# 📝 Blogify - MERN Stack Blog Application

**Blogify** is a full-stack blog app built using the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to register, log in, and create, edit, or delete their own blog posts. Admins have extended privileges. The backend API includes secure authentication, role-based access, and clean REST endpoints.

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
Blogify/
├── client/           # React frontend (in progress)
├── server/           # Node.js backend
│   ├── controllers/  # Route logic
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   ├── auth.js       # JWT & auth middleware
│   ├── index.js      # Main entry point
│   └── .env          # Environment config
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
MONGODB_STRING=<your_mongo_connection_string>
JWT_SECRET_KEY=BlogifyAPI
```

4. **Start the backend server:**

```bash
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Authentication Routes

| Endpoint                  | Method | Description             |
|---------------------------|--------|-------------------------|
| `/users/register`         | POST   | Register a new user     |
| `/users/login`            | POST   | Log in and get token    |
| `/users/details`          | GET    | Get user info *(token)* |
| `/users/change-password`  | PUT    | Change user password    |
| `/users/update-profile`   | PUT    | Update user info        |

---

### 📝 Blog Routes

| Endpoint             | Method | Description                          |
|----------------------|--------|--------------------------------------|
| `/blogs/create`      | POST   | Create a new blog *(token)*          |
| `/blogs/all`         | GET    | Get all blogs                        |
| `/blogs/view/:id`    | GET    | Get one blog post by ID              |
| `/blogs/edit/:id`    | PATCH  | Edit blog *(author or admin only)*   |
| `/blogs/remove/:id`  | DELETE | Delete blog *(author or admin only)* |

---

### 💬 Comment Routes

| Endpoint                        | Method | Description                          |
|----------------------------------|--------|--------------------------------------|
| `/comments/add/:blogId`         | POST   | Add a comment *(token)*              |
| `/comments/blog/:blogId`        | GET    | View comments for a blog post        |
| `/comments/delete/:commentId`   | DELETE | Admin delete any comment *(token)*   |

---

## ✅ Example Token Header

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
```

---

## 📌 To Do
- [ ] React frontend UI (`client/`)
- [ ] Like system
- [ ] Admin dashboard
- [ ] Pagination and search

---

## 💡 Author

Made with ❤️ by Marie Glenn Alano  
[GitHub Profile](https://github.com/marieglennalano)
