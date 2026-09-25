# COURSETO - Online Learning Platform

A modern, responsive, multi-page online learning web application built with pure HTML, Vanilla CSS, and JavaScript, strictly adhering to the visual design, typography, spacing, and interaction specifications of the COURSETO design system.

---

## 🌟 Key Features

### 1. Login Page (`index.html`)
- **Visual Design**: Reproduces `log in.png` with full-viewport vector landscape starry night sky, "Welcome Back" typography, 4 translucent social icons (Facebook, Twitter, Instagram, YouTube), and right-hand sign-in form.
- **Form Controls**: Email Address, Password, Remember Me checkbox, "Sign in now" gradient orange button, "Lost your password?", and "Create account" link.
- **Strict Authentication**:
  - Only registered accounts stored in `localStorage` can log in.
  - Arbitrary credentials are automatically rejected.
  - Validates blank inputs and incorrect credentials by turning borders red and displaying `"Email/password is incorrect."`
  - Error styling returns to normal as soon as the user starts correcting their input.
  - Successfully logged-in users are persisted to session/local storage and redirected to `dashboard.html`.

### 2. Create Account Page (`create-account.html`)
- **Visual Design**: Reproduces `create account.png` with a clean floating white card (`border-radius: 24px`), dual-column hero layout, and social signup options.
- **Strict Field Order & Validation**:
  1. **Nickname**:
     - Only alphabetic letters and spaces allowed (`/^[A-Za-z\s]+$/`).
     - Numbers and special characters are rejected with clear error messages.
     - Unnecessary spaces are trimmed.
  2. **Full Name**: Non-empty normal name validation.
  3. **Email**: Strict email format check + **duplicate email prevention**.
  4. **Create Password**: Password required with a minimum length of 6 characters.
  5. **Terms & Conditions**: Mandatory checkbox validation.
  6. **Get Started**: Primary blue pill button.
- **Account Creation**: Saves user profile to `localStorage` and redirects to `index.html?registered=true` showing a confirmation banner.

### 3. Student Dashboard (`dashboard.html`)
- **Visual Design**: Reproduces `COURSETO website page 2.png` inside an app window container with rounded corners (`28px`), dark navy sidebar, and light background.
- **Dynamic Header & Avatar**:
  - Replaces generic greeting with `Welcome Back! {Nickname}` (e.g., `Welcome Back! Sarah`).
  - Circular avatar automatically displays the **uppercase first letter** of the user's nickname (e.g., Sarah → `S`, Michael → `M`, John → `J`).
- **Dashboard Stats**:
  - Enrolled: `4`
  - Complete: `2`
  - Learning: `34 hours`
- **Continue Learning Section**:
  - Course: "Web Development Fundamentals"
  - Progress: "Lesson 8 of 12"
  - Teal progress bar at `72%`
  - "Continue" button
- **My Courses Mini-List**:
  - Course 1 (72% progress)
  - Course 2 (35% progress)
  - Course 3 (53% progress)

### 4. My Courses Page (`my-courses.html`)
- **Visual Design**: Reproduces `MY COURSE page.png`.
- **Dynamic Header**: Displays `Course Of: {Nickname}` (e.g., `Course Of: Sarah`).
- **Active Navigation**: "My Courses" pill highlighted in bright blue.
- **Featured Course Card**:
  - Illustration of web development workspace
  - "Web Development Fundamentals"
  - "Learn HTML, CSS, JavaScript and the basics of web development."
  - Instructor: John Smith
  - 8 of 12 lessons completed
  - Progress bar: Teal 72%
  - Last accessed: September 25, 2026
  - "Continue" button
- **Course List**:
  - Python Basics (35% progress, "View Course")
  - UI/UX Design (53% progress, "View Course")

### 5. Session Management & Protected Routes
- **Route Guard**: Direct access to `dashboard.html`, `my-courses.html`, or other dashboard pages without a session immediately redirects to `index.html`.
- **Sign Out**: Available from both the sidebar and the avatar dropdown menu; clears user session and redirects to `index.html`.
- **Micro-Animations**: Subtle `translateY(-2px)` hover lift on all primary blue buttons, orange buttons, sidebar pills, bell icon, and circular user avatar.

---

## 📂 Project Structure

```
courseto/
├── index.html              # Login page matching 'log in.png'
├── create-account.html     # Registration page matching 'create account.png'
├── dashboard.html          # Student Dashboard matching 'COURSETO website page 2.png'
├── my-courses.html         # Courses page matching 'MY COURSE page.png'
├── browse-courses.html     # Secondary navigation page
├── schedule.html           # Secondary navigation page
├── messages.html           # Secondary navigation page
├── certificates.html       # Secondary navigation page
├── css/
│   └── style.css           # Global stylesheet with design tokens & Poppins font
├── js/
│   ├── auth.js             # Core authentication service & route guards
│   ├── dashboard.js        # Dashboard dynamic greetings & interactions
│   └── my-courses.js       # My courses page controller
├── assets/
│   ├── background.jpg      # Starry mountain lake landscape wallpaper
│   ├── logo.jpg            # COURSETO cap & stacked books emblem
│   └── web-dev-illustration.jpg # Web development course graphic
├── start-server.ps1        # Pure PowerShell local HTTP server script
└── README.md               # Documentation
```

---

## 🚀 How to Run

### Option 1: Direct File Opening
Open `index.html` directly in Google Chrome, Microsoft Edge, or Firefox:
```
file:///C:/Users/jorge/.gemini/antigravity-ide/scratch/courseto/index.html
```

### Option 2: Pure PowerShell Server (Port 3000)
Run in PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\jorge\.gemini\antigravity-ide\scratch\courseto\start-server.ps1
```
Then visit:
```
http://localhost:3000/index.html
```
