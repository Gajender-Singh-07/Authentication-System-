# 🔐 Authentication System using Node.js, Express, MongoDB, and OTP

This project is a simple **user authentication system** that supports **user registration with email-based OTP (One-Time Password) verification** using:

- **Node.js & Express** – server and routing
- **MongoDB with Mongoose** – database for user data
- **EJS** – templating engine for rendering views
- **Nodemailer** – sending OTP via email
- **OTP Generator** – for generating 6-digit OTP codes
- **Bootstrap** – for frontend styling

## 📁 Folder Structure

```
Authentication/
│
├── index.js                 # Main server file
├── package.json             # Project metadata and dependencies
├── views/                   # EJS templates (HTML pages)
├── public/                  # Static files like CSS/JS
└── node_modules/            # Installed dependencies
```

---

## ⚙️ How It Works

1. **Dependencies** are loaded using `require` (Express, Mongoose, Nodemailer, etc.).
2. **MongoDB connection** is established via `mongoose.connect()`.
3. A **user schema** is defined with fields: `Username`, `Email`, and `Password`.
4. **User registration form** (served via EJS) takes user details.
5. On submission:
   - A **6-digit OTP** is generated using `otp-generator`.
   - The OTP is emailed to the user using **Nodemailer**.
   - User must verify with the OTP to complete registration.
6. **Sessions** are managed using `express-session`.

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/Authentication.git
cd Authentication
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start MongoDB

Make sure MongoDB is running locally on port `27017`.

### 4. Run the App

```bash
node index.js
```

Visit `http://localhost:3000` in your browser.

---

## 📬 Email Setup

To send OTP emails via Gmail:
- Configure your Gmail in `index.js` inside the `nodemailer.createTransport` block.
- Enable "less secure apps" or use an **App Password** if using 2FA.

---

## 🧪 Features

- Secure session-based authentication
- OTP-based email verification
- EJS templating for UI
- MongoDB integration for user data
