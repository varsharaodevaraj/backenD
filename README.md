# VideoTube Backend API

This is a full-featured backend service for a video-sharing platform. It includes secure user authentication, video upload and management, and integration with Cloudinary for media storage.

Designed with modularity, scalability, and security in mind, this backend demonstrates modern best practices using Node.js, Express, and MongoDB.

---

## Features

- User registration and login with JWT authentication
- Access and refresh token system
- Password hashing with bcrypt
- Secure route access with middleware protection
- Upload and manage user avatars and cover images
- Upload, update, and delete videos with metadata
- Track and fetch watch history
- Role-protected and versioned API routing
- Cloudinary integration for media file storage

---

## Technologies Used

- Node.js and Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Cloudinary for media storage
- Multer for handling file uploads
- dotenv for environment configuration
- cookie-parser and cors for secure request handling

---

## Project Structure
├── controllers # Request handlers and business logic
├── db # MongoDB connection setup
├── middlewares # Authentication and file handling
├── models # Mongoose schemas
├── routes # API route definitions
├── utils # Reusable helper functions
├── app.js # Express app and middleware setup
├── index.js # Entry point of the server
├── constants.js # Application constants
└── .env.example # Environment variable template

> To run this project, clone the repo, install dependencies with `npm install`, create a `.env` file, and start the server using `npm run dev`.
