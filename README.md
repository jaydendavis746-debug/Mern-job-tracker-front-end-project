

# 🎯 CareerBoards – Frontend

CareerBoards is a MERN job tracking application that allows users to manage their job applications visually.
Users can create job cards, drag and drop them across stages, and add notes to each job.

This repository contains the **React frontend**.

---

# 🚀 Features

* User authentication (Sign up / Sign in)
* Create, read, update, and delete job cards
* Drag and drop job cards between columns (custom implementation – no library)
* View job details on a dedicated page
* Add and delete notes on each job card
* Protected routes for authenticated users
* Modal-style job details using background routing
* Wildcard route for unknown URLs

---

# 🛠 Tech Stack

* React
* React Router
* JavaScript
* CSS Modules
* Fetch API for backend communication
* Context API for global user state

---

# 📁 Project Structure

```
src/
│
├── components/
│   ├── Dashboard/
│   ├── JobCards/
│   ├── JobCardDetails/
│   ├── JobForm/
│   ├── NoteForm/
│   ├── SignInForm/
│   ├── SignUpForm/
│   └── Modal/
│
├── contexts/
│   └── UserContext.jsx
│
├── services/
│   ├── authService.js
│   └── jobService.js
│
├── assets/
│
├── App.jsx
└── main.jsx
```

---

# 🔐 Authentication

Authentication is handled using JWT stored on the client.

`authService.js` manages:

* Sign up
* Sign in
* Storing and removing the token
* Getting the current user

`UserContext` provides the authenticated user across the app.

---

# 🌐 API Communication

The frontend communicates with the backend using the **Fetch API** inside the `services/` folder.

Example:

```js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs`;

export const show = async (jobId) => {
  const res = await fetch(`${BASE_URL}/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root of the frontend project and add:

```
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

This is used to connect the frontend to your backend API.

⚠️ The `VITE_` prefix is required for Vite to expose the variable to the client.

---

# 🧭 Routing

Routes are defined in `App.jsx` and render components from the `components/` folder.

### Public Routes

* `/` → Landing page
* `/sign-in` → Sign in form
* `/sign-up` → Sign up form

### Protected Routes

* `/jobs` → Job board with drag & drop
* `/jobs/new` → Create job card
* `/jobs/:jobId` → Job details + notes
* `/jobs/:jobId/edit` → Edit job card

### Modal Route

Job details can also render inside a modal using `backgroundLocation` for a better UX.

### Wildcard Route

Invalid URLs are handled with:

```jsx
<Route path="*" element={<h2>Whoops, you're not supposed to be here!</h2>} />
```

---

# 🗂 Job Board & Drag and Drop

The dashboard displays job cards grouped by status:

* Prospective
* Applied
* Interview
* Offer
* Rejected

Drag and drop is implemented **manually** using native browser drag events:

* `onDragStart`
* `onDragOver`
* `onDrop`

When a card is dropped into a new column, its status is updated and persisted to the backend.

No external drag-and-drop library was used.

---

# 📝 Job Details & Notes

The job details page (`/jobs/:jobId`) displays:

* Job information
* Edit and delete actions
* Notes related to that job

Users can:

* Add notes
* Delete notes

Notes are stored in the backend and fetched with the job.

---

# ⚠️ Error Handling

* Invalid job IDs show a **“No job found”** message
* Unknown routes show a wildcard fallback
* Loading states are displayed while fetching data

---

# ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jaydendavis746-debug/Mern-job-tracker-front-end-project.git
cd Mern-job-tracker-front-end-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

### 4. Start the development server

```bash
npm run dev
```

Make sure the backend server is running.

---

# 🔗 Backend Repository

The backend repository can be found here:
👉 [https://github.com/jaydendavis746-debug/Mern-job-tracker-back-end-project](https://github.com/jaydendavis746-debug/Mern-job-tracker-back-end-project)

---

# 📌 Future Improvements

* Search and filter job cards
* Due dates and reminders
* File uploads for CVs and cover letters
* Better mobile drag-and-drop support
* Toast notifications for actions

---

# 👤 Author

* Built by **jaydendavis746-debug** as a MERN portfolio project.
* With the collaboration of Ranjith-Jacob with the sign-up and sign-in routes


---




