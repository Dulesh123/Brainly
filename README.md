# 🧠 Brainly – Smart Knowledge Management Platform

Brainly is a full-stack **MERN** application that helps users organize their digital knowledge by saving **links, notes, PDFs, images, and documents** in one place. It features secure authentication, cloud storage, AI-powered link insights, real-time sharing, and a modern responsive user interface.

## 🌐 Live Demo

**Frontend:** https://brainly-app-five.vercel.app

**Frontend Hosting:** Vercel

**Backend Hosting:** Render

**Database:** MongoDB Atlas

---

# ✨ Features

### 🔐 Authentication

* User Signup & Login
* JWT-based Authentication
* Secure Password Hashing using bcrypt
* Forgot Password functionality
* Password Reset via Email
* Email notifications using **Brevo** and **Resend**

---

### 📂 Content Management

* Save Links
* Save Notes
* Upload Images
* Upload PDFs
* Upload Documents
* Full CRUD Operations
* Categorize content for easy management

---

### ☁️ Cloud Storage

* File uploads using **Multer**
* Cloud storage with **Cloudinary**
* Secure file URLs
* Fast image and document delivery

---

### 🤖 AI Integration

* Integrated **OpenAI API**
* Fetches contextual information about saved links
* Displays AI-generated summaries and useful insights on user interaction

---

### 🔗 Real-Time Link Sharing

* Share saved links instantly
* Email sharing using **Resend** and **Brevo**
* Quick and seamless collaboration

---

### 🎨 Modern UI/UX

* Clean and responsive design
* Mobile-friendly interface
* Smooth navigation
* Interactive cards and layouts
* Optimized user experience
* Fast loading pages

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript (ES6+)
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcrypt

### Cloud Storage

* Multer
* Cloudinary

### AI

* OpenAI API

### Email Services

* Brevo
* Resend

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

# 📁 Project Structure

```text
Brainly/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/brainly.git
cd brainly
```

---

### Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

OPENAI_API_KEY=your_openai_api_key

BREVO_API_KEY=your_brevo_api_key

RESEND_API_KEY=your_resend_api_key
```

---

# ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm start
```

---

# 📌 How It Works

1. Users register or log in securely.
2. Upload documents, PDFs, images, notes, or save useful links.
3. Files are uploaded through **Multer** and stored securely in **Cloudinary**.
4. Metadata is stored in **MongoDB Atlas**.
5. Clicking on a saved link fetches contextual information using the **OpenAI API**.
6. Users can edit or delete their saved content anytime.
7. Password recovery emails are sent using **Brevo** and **Resend**.
8. Links can be shared with others in real time.

---

# 🚀 Key Highlights

* ✅ Full MERN Stack Application
* ✅ RESTful API Architecture
* ✅ Secure Authentication
* ✅ Cloud File Storage
* ✅ AI-powered Link Insights
* ✅ Real-time Link Sharing
* ✅ Forgot Password & Email Verification
* ✅ Responsive UI
* ✅ Production Deployment
* ✅ Scalable Architecture

---

# 📸 Screenshots

Add screenshots of your application here.

```text
screenshots/
│
├── home.png
├── dashboard.png
├── upload.png
├── ai-summary.png
└── login.png
```

---

# 🔮 Future Enhancements

* Folder Organization
* Search & Filters
* Drag-and-Drop Uploads
* Favorite Items
* Tags & Categories
* Collaborative Workspaces
* Rich Text Notes
* Dark Mode
* Mobile Application
* Browser Extension

---

# 📚 Technologies Used

* React.js
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt
* Multer
* Cloudinary
* OpenAI API
* Brevo
* Resend
* Axios
* REST APIs

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Dulesh Shivakale**

If you like this project, don't forget to ⭐ the repository!
