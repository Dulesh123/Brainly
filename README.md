# 🧠 Brainly

Brainly is a simple and clean web app that helps users save important links and posts they might need in the future. It offers a user-friendly interface to add, manage, and keep track of saved content. This project is built using the MERN stack for a seamless full-stack experience.

## ✨ Features

- 📌 Add and manage important links and notes  
- 🧼 Clean and minimal UI for productivity  
- 🛠️ Built using MERN (MongoDB, Express, React, Node.js)

---

## 🚀 Getting Started – Run Locally

### ✅ Prerequisites

Make sure you have the following installed on your system:

- 📦 [Node.js](https://nodejs.org/) (v16 or later recommended)  
- 🛢️ [MongoDB](https://www.mongodb.com/)  
- 🔧 [Git](https://git-scm.com/)

---

### 🛠 Steps to Run the Project Locally

```bash
# 1️⃣ Clone the Repository
git clone https://github.com/yourusername/Brainly.git
cd Brainly

# 2️⃣ Set Up the Backend
cd Brainly-Backend
npm install

# ⚠️ 3️⃣ Change MongoDB URL
# Open 'index.ts' in Brainly-Backend folder
# Replace the existing MongoDB connection string with your own

# 4️⃣ Build and Start the Backend
tsc -b
node dist/index.js

# 5️⃣ Set Up the Frontend
cd ../Brainly-Frontend/frontend
npm install

# 6️⃣ Start the Frontend
npm run dev
