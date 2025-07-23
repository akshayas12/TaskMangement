# 📝 Task Management Dashboard

A responsive and user-friendly Task Management Dashboard built with React.js, providing features such as authentication, task CRUD operations, and filtering/sorting. This project is built using functional components, React Hooks, and validated with React Hook Form + Yup.

## 🚀 Live Demo

🔗 [View Live on Vercel](https://your-vercel-link.vercel.app)  
🔗 [GitHub Repository](https://github.com/your-username/task-management)

---

## 📋 Features

✅ User Authentication  
✅ View, Add, Edit, and Delete Tasks  
✅ Mark Tasks as Completed  
✅ Filter Tasks (All / Completed / Pending)  
✅ Sort Tasks by Due Date  
✅ Responsive UI with Tailwind CSS  
✅ Form Validation using React Hook Form + Yup  
✅ JWT-based Authentication  
✅ Protected Routes & LocalStorage Token Management

---

## 🧪 Task Summary

Build a Task Management Dashboard with:

- **Authentication (JWT):**
  - Register
  - Login
  - Logout
  - Token stored in `localStorage`
  - Redirect unauthenticated users

- **Task Features:**
  - View all tasks
  - Add new tasks
  - Edit existing tasks
  - Delete tasks (with confirmation)
  - Mark tasks as Completed
  - Filter and Sort tasks

---

## 🧰 Tech Stack

- React.js (Vite + Functional Components)
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS
- React Hook Form + Yup
- JWT-based Auth
- GitHub for version control
- Vercel for deployment

---

## 🔐 APIs Used

### ✅ Authentication (Reqres.in)
- **Register:** `POST https://reqres.in/api/register`
- **Login:** `POST https://reqres.in/api/login`
- **Get User:** `GET https://reqres.in/api/users/2`

### 📋 Tasks (JSONPlaceholder)
- **Get Tasks:** `GET https://jsonplaceholder.typicode.com/todos`
- **Get Task by ID:** `GET /todos/{id}`
- **Add Task:** `POST /todos`
- **Update Task:** `PUT /todos/{id}`
- **Delete Task:** `DELETE /todos/{id}`

---

## 🧾 Setup Instructions

```bash
# Clone repo
git clone https://github.com/your-username/task-management.git

# Navigate to project
cd task-management

# Install dependencies
npm install

# Start development server
npm run dev
