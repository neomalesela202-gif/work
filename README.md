# Community Library Management System

A React app for managing a community library. Data is saved in the browser's localStorage.

## Run

1. Open this folder in VS Code.
2. In the terminal run:

       npm install
       npm run dev

3. Open the localhost link shown in the terminal (usually http://localhost:5173/).

## Login

- Name: Admin
- Membership ID: ADMIN001

## Features

- Book management: add, update, delete (title, author, genre, ISBN, quantity)
- Availability: add stock, deduct stock when borrowed, transaction history log
- User management: login, add, update, delete users (name, membership ID, role)
- Dashboard: availability table, low stock (fewer than 2 copies) highlighted
- React Hooks, reusable components, controlled forms with validation, React Router, localStorage

## Roles

- admin: everything, including user management
- librarian: dashboard, books, transactions
- member: dashboard only

## Structure

    src/
      main.jsx, App.jsx, index.css
      components/  Navbar, Field, BookForm, UserForm, LoginForm, TransactionForm
      pages/       Dashboard, Books, Transactions, Users
      hooks/       useLocalStorage.js
      utils/       validation.js
