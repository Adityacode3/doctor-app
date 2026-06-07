🏥 Doctor Appointment Booking System

A full-stack web application built with the MERN Stack that allows patients to book doctor appointments based on AI-powered symptom analysis.
Live - https://doctor-app-self.vercel.app/login

👨‍💻 Project Overview
This project is a Doctor Appointment Booking Web Application where a patient can:

Register and log in securely
Describe their symptoms
Get an AI-based specialist recommendation
Browse available doctors of that specialty
Book an appointment by selecting a day and time
View or cancel their past appointments

The goal was to build a clean, working, full-stack application using industry-standard tools while keeping the code simple and easy to understand.

🛠 Tech Stack
LayerTechnologyWhy We Used ItFrontendReact.js (Vite)Fast, component-based UI developmentRoutingReact Router DOM v6Multi-page navigation inside a single-page appHTTP RequestsAxiosClean API calls with automatic token attachmentBackendNode.js + Express.jsLightweight and fast REST API serverDatabaseMongoDB + MongooseFlexible NoSQL database for storing users, doctors, appointmentsAuthenticationJWT (JSON Web Token)Stateless, secure login sessionsPassword HashingbcryptjsSecurely store passwords — never saved as plain textEmail ServiceNodemailer + GmailSend password reset links to user emailStylingPlain CSSNo CSS frameworks — written from scratch for full control

🤖 How the AI Works (Simple Explanation)
There is no paid AI API used in this project. Instead, we built a custom rule-based symptom classifier.
How it works:

We created a dictionary in the backend that maps each medical specialist to a list of symptom keywords.

Cardiologist  → ["chest pain", "heart", "palpitation", "high blood pressure" ...]
Dermatologist → ["rash", "skin", "acne", "itching", "eczema" ...]
Neurologist   → ["headache", "migraine", "seizure", "numbness" ...]
...and so on for 10 specialists

When a user types their symptoms (e.g. "I have a severe headache and dizziness"), the system checks each specialist's keyword list and counts how many keywords appear in the user's input.
The specialist with the highest keyword match count is recommended.
If nothing matches clearly, it defaults to General Physician.

Why this approach?

Free — no API costs
Fast — runs entirely on our own server
Easy to understand and explain
Can be extended with more keywords anytime


🔐 Authentication Flow
User Registers → Password is hashed with bcryptjs → Saved in MongoDB
User Logs In   → Password is compared → JWT Token is issued (valid 7 days)
Every Request  → Token is sent in Authorization header → Middleware verifies it
For Forgot Password:
User enters email → Random reset token generated → Saved in DB with 1hr expiry
→ Reset link emailed via Nodemailer → User clicks link → New password saved

📋 Features
✅ Authentication

Signup with Name, Age, Gender, Email, Password
Login with email and password
Forgot Password (sends reset link to email)
Reset Password (secure token-based)

✅ Home Page

Personalized welcome message
Quick links to Book Appointment and View History

✅ Appointment Booking (4-Step Flow)

Step 1 — Patient describes symptoms in a text box
Step 2 — AI recommends a specialist and shows matching doctors with their available days and time slots
Step 3 — Patient reviews and confirms the appointment
Step 4 — Success screen with appointment summary

✅ Appointment History

View all past bookings (doctor name, specialization, day, time, symptoms)
Cancel any appointment with one click


🗄 Database Models
User
name, age, gender, email, password (hashed), resetPasswordToken, resetPasswordExpires
Doctor
name, specialization, availableDays (array), availableSlots (array)
Appointment
user (ref → User), doctor (ref → Doctor), symptoms, appointmentDate, appointmentTime

📡 API Endpoints
Authentication — /api/auth
MethodEndpointDescriptionPOST/registerCreate a new user accountPOST/loginLogin and receive JWT tokenPOST/forgot-passwordSend password reset emailPOST/reset-password/:tokenReset password using email token
Doctors — /api/doctors
MethodEndpointDescriptionGET/Get all doctorsGET/?specialization=CardiologistGet doctors by specialization
AI — /api/ai
MethodEndpointDescriptionPOST/analyzeSend symptoms, receive specialist recommendation
Appointments — /api/appointments
MethodEndpointDescriptionPOST/Book a new appointmentGET/Get all appointments for logged-in userDELETE/:idCancel an appointment

Protected routes — All doctor, AI, and appointment routes require a valid JWT token in the request header.


📁 Folder Structure
doctor-app/
│
├── backend/
│   ├── server.js                  ← Entry point, starts the server
│   ├── models/                    ← MongoDB data schemas
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── controllers/               ← Business logic for each feature
│   │   ├── authController.js
│   │   ├── aiController.js
│   │   ├── doctorController.js
│   │   └── appointmentController.js
│   ├── routes/                    ← URL routing
│   │   ├── authRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── appointmentRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js      ← JWT verification
│   └── config/
│       └── seedDoctors.js         ← Script to insert sample doctors
│
└── frontend/
    └── src/
        ├── pages/                 ← One file per screen
        │   ├── Login.jsx
        │   ├── Signup.jsx
        │   ├── ForgotPassword.jsx
        │   ├── ResetPassword.jsx
        │   ├── Home.jsx
        │   ├── BookAppointment.jsx
        │   └── AppointmentHistory.jsx
        ├── components/
        │   └── Navbar.jsx
        ├── utils/
        │   └── api.js             ← Axios instance with token
        ├── App.jsx                ← Routes + protected route logic
        └── index.css              ← All styles

▶️ How to Run This Project
Prerequisites

Node.js installed (v18+)
A free MongoDB Atlas account
A Gmail account (for email feature)

1. Clone or extract the project
2. Setup Backend
bashcd backend
npm install
cp .env.example .env
# Fill in .env with your MongoDB URI, JWT secret, and Gmail credentials
node config/seedDoctors.js   # Add sample doctors to database
npm run dev                  # Starts on http://localhost:5000
3. Setup Frontend
bashcd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev                  # Opens on http://localhost:5173
