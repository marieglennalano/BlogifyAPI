# 📝 Blogify API (Backend)

This is the **Express.js + MongoDB** backend API for **Blogify**, a full-featured blogging platform supporting authentication, blog CRUD, comments, and Google OAuth login.

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

## 📁 Folder Structure

```
server/
├── controllers/        # Route handlers (users, blogs, comments)
├── middleware/         # Auth & error middleware
├── models/             # Mongoose schemas
├── routes/             # Route declarations
├── index.js            # Main entry point
├── .env                # Environment variables
├── package.json
└── README.md
```

---

## 🔐 Environment Variables (`.env`)

```
PORT=4000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/blogify.git
cd blogify/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up `.env`

Create a `.env` file with the values listed above.

### 4. Run the server

```bash
npm run dev
```

The API will be running on `http://localhost:4000`

---

## 🔑 API Endpoints

### Auth Routes

| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| POST   | `/users/register`    | Register a new user   |
| POST   | `/users/login`       | Login with email/pass |
| POST   | `/users/google-login`| Login via Google OAuth|
| GET    | `/users/profile`     | Get user profile (auth)|

### Blog Routes

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | `/blogs/create`   | Create new blog (auth)   |
| GET    | `/blogs/all`      | Get all blog posts       |
| GET    | `/blogs/:id`      | Get blog by ID           |
| PATCH  | `/blogs/:id`      | Update blog (auth)       |
| DELETE | `/blogs/:id`      | Delete blog (auth)       |

### Comment Routes

| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/comments/:blogId`    | Add comment to a blog        |
| PATCH  | `/comments/:commentId` | Edit a comment (auth)        |
| DELETE | `/comments/:commentId` | Delete a comment (auth)      |

---

## 🛡️ Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **OAuth 2.0 APIs**
4. Add a new **OAuth Client ID** for **Web**
5. Authorized origin: `http://localhost:3000` (or your frontend domain)
6. Copy `Client ID` to `.env` as `GOOGLE_CLIENT_ID`

---

## 📄 License

MIT

---

## 👨‍💻 Author

Build with ❤️ by Marie Glenn Alano  
[GitHub Profile](https://github.com/marieglennalano)
