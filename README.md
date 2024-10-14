# Library Management System

![Library Management System](https://drive.google.com/uc?export=view&id=1z_Fe8_b3DDoOIH8a4THhyxOGRsGh8IbE)

This is a full-stack Library Management System built using **React (TypeScript)** for the frontend and **.NET** for the backend. The system allows users to register, log in, and manage books (read, add, update, delete). The application uses **SQLite** as the database. The interface is fully **responsive** and includes a **search functionality** to quickly find books.

## Video Demonstration

Watch the video demonstration of the project [here](https://drive.google.com/file/d/1Z_7Ex3KCwIg0SD0OpBb_EaOw0uLBBW37/view?usp=drive_link).

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [Register](#register)
  - [Login](#login)
  - [Manage Books](#manage-books)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Ports](#ports)
- [Contribution](#contribution)
- [License](#license)

## Getting Started

### Prerequisites

To run the project, you need to have the following installed:

- [Node.js](https://nodejs.org/en/download/) (for managing the React TypeScript frontend dependencies)
- [.NET SDK](https://dotnet.microsoft.com/download) (for the backend)
- [SQLite](https://www.sqlite.org/download.html) (for the database)

### Backend Setup

1. Open your terminal and navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Restore the .NET dependencies:

    ```bash
    dotnet restore
    ```

3. Start the backend server:

    ```bash
    dotnet run
    ```

   The backend will run on `http://localhost:5289`.

### Frontend Setup (React with TypeScript)

1. In a new terminal, navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install the required packages:

    ```bash
    npm install
    ```

3. Start the React app:

    ```bash
    npm start
    ```

   The React app will run on `http://localhost:3000`.

## Usage

### Register

- Navigate to `http://localhost:3000`.
- Click on the "Register" button.
- Enter your username, email, and password to create an account.

### Login

- After registering, log in with your email and password via the "Login" button.

### Manage Books

After logging in, you can:

- **Add a book**: Enter the book's title, author, and description, then click "Add Book".
- **Update a book**: Click on the "Edit" button for the desired book, modify the details, and save.
- **Delete a book**: Click on the "Delete" button to remove a book.
- **Search books**: Use the search bar to quickly find a specific book by title or author.

## Database

This project uses **SQLite** as the database. The database will be initialized automatically when the backend is started. The SQLite file will be stored in the `backend` directory.

## API Endpoints

The following API endpoints are available in the backend:

- **User Authentication**:
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.
- **Books Management**:
  - `GET /api/books`: Retrieve all books.
  - `POST /api/books`: Add a new book.
  - `PUT /api/books/:id`: Update an existing book.
  - `DELETE /api/books/:id`: Delete a book.

## Ports

- **Frontend (React with TypeScript)**: `http://localhost:3000`
- **Backend (.NET)**: `http://localhost:5289`

Make sure both services are running concurrently for the application to work correctly.

## Contribution

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.


