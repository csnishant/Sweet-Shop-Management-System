# Sweet Shop Management System

## Project Overview

The **Sweet Shop Management System** is a full‑stack **Single Page Application (SPA)** built using the **MERN stack**. It allows users to register and log in, view available sweets, search and filter sweets, and purchase them. Admin users have additional privileges to add, update, delete, and restock sweets. The backend exposes secure REST APIs protected with JWT authentication, and the frontend provides a modern, responsive UI.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### Frontend

* React.js
* Vite
* Tailwind CSS

---

## Features

* User Registration and Login
* JWT‑based Authentication and Authorization
* View all available sweets
* Search sweets by name, category, or price range
* Purchase sweets (inventory updates automatically)
* Purchase button disabled when stock is zero
* Admin functionalities:

  * Add new sweets
  * Update sweet details
  * Delete sweets
  * Restock sweets
* Responsive UI with SPA behavior

---

## Setup Instructions

### Prerequisites

* Node.js (v18 or above recommended)
* MongoDB (local or MongoDB Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will run on the Vite development server.

---

## Screenshots

Create a `screenshots/` folder in the root directory and add the following images:

1. Login / Register Page
2. Dashboard displaying all sweets
3. Search and filter functionality
4. Purchase button disabled when quantity is zero
5. Admin panel for Add / Update / Delete sweets

Example usage:

```md
![Dashboard](screenshots/dashboard.png)
```

---

## Test Report

### Backend (Node.js + Express)

* User Registration API: ✅ Passed
* User Login API: ✅ Passed
* Add Sweet API: ✅ Passed
* Get All Sweets API: ✅ Passed
* Search Sweets API: ✅ Passed
* Update Sweet API: ✅ Passed
* Delete Sweet API (Admin): ✅ Passed
* Purchase Sweet API: ✅ Passed
* Restock Sweet API (Admin): ✅ Passed

### Frontend (React)

* Login Form Rendering: ✅ Passed
* Register Form Rendering: ✅ Passed
* Dashboard Displays Sweets: ✅ Passed
* Search & Filter Functionality: ✅ Passed
* Purchase Button Disabled if Out of Stock: ✅ Passed
* Admin Add / Update / Delete Sweet UI: ✅ Passed

> Backend tests were implemented using **Jest + Supertest**. Frontend tests were implemented using **React Testing Library**. All major functionalities were tested successfully.

---

## My AI Usage

I used **ChatGPT** as an AI assistant throughout the development of this project.

### AI Tools Used

* ChatGPT

### How I Used AI

* Generated initial backend API boilerplate using Node.js and Express.
* Assisted in designing REST API endpoints for authentication, sweets management, and inventory operations.
* Helped scaffold React components using Vite and Tailwind CSS.
* Provided guidance on folder structure, clean coding practices, and best practices.
* Suggested example test cases and improvements for code readability.

### Reflection on AI Usage

ChatGPT significantly improved my development speed and helped me structure the project in a clean and scalable way. It reduced repetitive coding effort and provided clarity while implementing APIs and frontend components. However, all business logic, API integration, testing, and final implementation decisions were reviewed and implemented by me. AI was used as a support tool, not a replacement for understanding the code.


