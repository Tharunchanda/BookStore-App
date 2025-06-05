
# 📚 BookStore-App

A **MERN (MongoDB, Express.js, React.js, Node.js)** full-stack Book Store application with **Role-Based Access Control (RBAC)**. This application allows users to browse, add, edit, and delete books, with access controls based on user roles.

---

## 🚀 Features

* User Authentication and Authorization
* Role-Based Access Control (Admin, User)
* CRUD Operations for Books
* Responsive UI with React.js
* RESTful API with Express.js
* MongoDB for Data Storage

---

## 🛠️ Technologies Used

* **Frontend**: React.js, Redux, Axios, Bootstrap
* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Authentication**: JWT (JSON Web Tokens)
* **Version Control**: Git, GitHub([github.com][1])

---

## 📂 Folder Structure

```


BookStore-App/
├── frontend/           # React.js application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── App.js
├── backend/            # Node.js application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
├── README.md
└── package.json
```



---

## 🧰 Installation

### Prerequisites

* Node.js and npm installed
* MongoDB installed and running

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tharunchanda/BookStore-App.git
   cd BookStore-App
   ```



2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```



3. **Configure environment variables**

   Create a `.env` file in the `backend` directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```



4. **Start the backend server**

   ```bash
   npm start
   ```



5. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```



6. **Start the frontend application**

   ```bash
   npm start
   ```



The application will be available at your local server.

---

