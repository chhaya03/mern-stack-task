## Project Overview

The task involves developing a web application that allows users to browse through a list of products categorized by various parameters. Users should have the capability to sort and filter products based on criteria such as categories, price range, gender, occasion, and discount. Furthermore, the application should empower users to seamlessly edit and delete their selected products, with these modifications being promptly reflected in the user interface.

## Github Repo:

https://github.com/enacton-tech/mern-stack-task

### Video Explanation

https://app.usebubbles.com/kG9NjR5kqBCssXm1yA5dZt/mernstack-interview-task-walkthrough

### Setting Up the Project

To set up the project locally, follow these steps:

1. Clone the repository and navigate to the project folder.
2. Import the product_database.sql file in to your MySQL database (you can use phpMyAdmin).
3. Update the .env file with your own MySQL credentials.
4. Run `npm install --force`.
5. Start the project using `npm run dev`.
6. Access the NextJS website at http://localhost:3000.
7. Setup the database, You would need mysql and workbench for the database. You can get it from here: https://dev.mysql.com/downloads/installer. To Import data in do refer to this document: https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html

### Requirements

#### Project Setup

# Clone the repo

git clone https://github.com/your-username/product-management-app.git
cd product-management-app

# Install dependencies

npm install

# Set up environment variables if any

# Example: touch .env and add DB_URL, API_KEY etc.

# Run development server

npm run dev

# 🛍️ Product Management App

A full-featured Product Management web application where users can **Filter**,**Pagination** and **Sort** **Add**, **Edit**, **Delete** products. Built as part of an assessment round to showcase frontend + backend development skills using the **MERN stack + SQL** integration.

---

## 🚀 Features

✅ Pagination support  
✅ Add new products with details
✅ Sort products by Rating, Price, Discount  
✅ Filter products by Category, Brand, Gender, Occasion  
✅ Upload product image (simulated)  
✅ Form validation with Formik + Yup  
✅ Edit product details with pre-filled form  
✅ Delete products with confirmation  
✅ Responsive, accessible UI  
✅ Toast notifications on actions  
✅ SQL-based data fetching and mutations

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Formik, React-Select, Toastify
- **Backend**: SQL (via Kysely), Server Actions (`"use server"`)
- **Validation**: Yup Schema
- **State Management**: React hooks
- **Dev Tools**: TypeScript, ESLint, Prettier

---

## 📂 Project Structure

src/
│
├── app/ # Next.js routes
│ ├── products/ # Product listing, add/edit pages
│
├── components/ # Reusable UI components
│ ├── ProductTable.tsx
│ ├── ProductRow.tsx
│ ├── DeleteProduct.tsx
│
├── actions/ # Server actions (fetch, update, delete)
│
├── db/ # Database config & queries
│
├── schemas/ # Yup validation schema
│
└── utils/ # Utility functions (e.g. currency formatting)

##🧪 Testing

✅ Delete product → Should update the list with toast confirmation

✅ Filters and sort should reflect in URL and update UI instantly

✅ Add product → Should redirect to /products

✅ Edit product → Should reflect updated fields

## Conclusion

We're thrilled to witness your skills in action as you tackle this project. Your dedication and creativity will play a vital role in crafting a seamless user experience. Best of luck, and we're excited to see your contributions!
