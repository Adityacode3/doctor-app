# 🏥 Doctor Appointment Booking App

A beginner-friendly MERN Stack project with AI-powered symptom analysis.

---

## 📁 Project Structure

```
doctor-app/
├── backend/
│   ├── config/
│   │   └── seedDoctors.js        # Script to add sample doctors to DB
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Forgot/Reset Password
│   │   ├── doctorController.js   # Get doctors
│   │   ├── aiController.js       # Symptom → Specialist mapping
│   │   └── appointmentController.js
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT token verification
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── aiRoutes.js
│   │   └── appointmentRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── ResetPassword.jsx
    │   │   ├── Home.jsx
    │   │   ├── BookAppointment.jsx
    │   │   └── AppointmentHistory.jsx
    │   ├── utils/
    │   │   └── api.js             # Axios instance
    │   ├── App.jsx                # Routes
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Setup Instructions

### Step 1 — Install Node.js
Download and install Node.js from https://nodejs.org (v18 or higher recommended).

---

### Step 2 — Set Up MongoDB Atlas (Free Cloud Database)

1. Go to https://www.mongodb.com/atlas and create a free account.
2. Create a new **free cluster** (M0 Sandbox).
3. Click **Connect → Connect your application**.
4. Copy the connection string (looks like `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`).
5. Go to **Network Access** → Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`).
6. Go to **Database Access** → Add a database user with username and password.

---

### Step 3 — Set Up Backend

```bash
# Navigate to backend folder
cd doctor-app/backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

Now open `.env` and fill in:
```
MONGO_URI=your_mongodb_atlas_connection_string/doctorapp?retryWrites=true&w=majority
JWT_SECRET=any_random_long_string_like_mysecretkey123
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password   (see Gmail App Password below)
PORT=5000
CLIENT_URL=http://localhost:5173
```

#### Gmail App Password (for email reset feature)
1. Go to your Google Account → Security
2. Enable 2-Step Verification
3. Search for "App Passwords"
4. Create a new app password → Copy it into EMAIL_PASS

---

### Step 4 — Seed Sample Doctors

```bash
# While still in the backend folder
node config/seedDoctors.js
```

You should see: `10 doctors added successfully!`

---

### Step 5 — Run the Backend

```bash
# In the backend folder
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

---

### Step 6 — Set Up Frontend

Open a **new terminal window**:

```bash
cd doctor-app/frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

The `.env` file should contain:
```
VITE_API_URL=http://localhost:5000/api
```

---

### Step 7 — Run the Frontend

```bash
npm run dev
```

Open your browser at: **http://localhost:5173**

---

## 🧪 Testing the App

1. Go to http://localhost:5173
2. Click **Sign Up** → Register with your details
3. Login with your email and password
4. Click **Book Appointment**
5. Enter symptoms like "I have chest pain and shortness of breath"
6. AI will suggest **Cardiologist**
7. Select a doctor, day, and time slot
8. Confirm the booking
9. View your appointment in **History**

---

## 🌐 Deployment

### Deploy Frontend on Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and login
3. Click **New Project** → Import your GitHub repo
4. Set **Root Directory** to `frontend`
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
6. Click **Deploy**

### Deploy Backend on Render (Free)

1. Go to https://render.com → New → Web Service
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add all environment variables from `.env`
7. Click **Deploy**

After deployment:
- Update `CLIENT_URL` in backend env to your Vercel frontend URL
- Update `VITE_API_URL` in Vercel to your Render backend URL

---

## 📡 API Reference

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login | No |
| POST | /api/auth/forgot-password | Send reset email | No |
| POST | /api/auth/reset-password/:token | Reset password | No |
| GET | /api/doctors | Get all doctors | Yes |
| GET | /api/doctors?specialization=X | Filter doctors | Yes |
| POST | /api/ai/analyze | Analyze symptoms | Yes |
| POST | /api/appointments | Book appointment | Yes |
| GET | /api/appointments | Get my appointments | Yes |
| DELETE | /api/appointments/:id | Cancel appointment | Yes |

---

## 🤖 How the AI Works

The AI is a **keyword matching engine** — no external API needed!

Located in `backend/controllers/aiController.js`

It checks your symptom text against a dictionary of keywords for each specialist:
- "chest pain" → **Cardiologist**
- "rash, acne" → **Dermatologist**
- "headache, migraine" → **Neurologist**
- "joint pain, bone" → **Orthopedist**
- "stomach, nausea" → **Gastroenterologist**
- "anxiety, depression" → **Psychiatrist**
- ...and more

The specialist with the most keyword matches wins. If nothing matches, it defaults to **General Physician**.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Email | Nodemailer + Gmail |
| Styling | Plain CSS |
