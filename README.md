# Boutique Management System

A full-stack web application designed for boutique/tailoring shop admins to efficiently manage customers, tailored orders, measurements, and billing.

## 🏗️ Architecture

- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Axios, React Router v6
- **Backend**: Node.js, Express.js, CORS
- **Database**: MySQL 

---

## 🚀 Getting Started

Follow these step-by-step instructions to run the project locally.

### 1. Database Setup (MySQL)

1. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or CLI).
2. Execute the setup script located at `database/setup.sql`.
   - This script creates the `boutique_management` database and the required tables (`customers`, `measurements`, `orders`, `payments`).
3. If your MySQL root user has a password, or if you create a dedicated user, you will need to specify these credentials in a `.env` file inside the `backend` folder:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=boutique_management
   PORT=5000
   ```

### 2. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The Express server should now be running on http://localhost:5000.*

### 3. Frontend Setup

1. Open a **new** terminal window/tab and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The React application will open in your default browser, typically at http://localhost:5173.*

---

## 📁 Project Structure

```
boutique-management-system/
│
├── database/
│   └── setup.sql              # Database schema script
│
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── customerController.js
│   │   ├── orderController.js
│   │   └── paymentController.js
│   ├── routes/
│   │   ├── customerRoutes.js
│   │   ├── orderRoutes.js
│   │   └── paymentRoutes.js
│   ├── package.json
│   └── server.js              # Entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── CustomerForm.jsx
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Billing.jsx
    │   │   ├── Customers.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Orders.jsx
    │   ├── App.jsx            # Routing setup
    │   ├── index.css          # Tailwind config & global styles
    │   └── index.jsx          # React entry point
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```
