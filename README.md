# 🩸 BloodBond - Lifesaving Blood Donation Platform

## 🌐 Live Website
**[Visit BloodBond Live](https://blood-bond-client-two.vercel.app)**

---

## 📖 About The Project

**BloodBond** is a comprehensive full-stack web application designed to connect blood donors with recipients seamlessly and efficiently. In emergency medical situations, finding the right blood group can be a race against time. BloodBond aims to digitize and simplify this process, ensuring that help reaches those in nee as quickly as possible.

### 💡 Why I Created This Website
The inspiration behind BloodBond comes from the critical need for a centralized, reliable, and accessible platform for blood donation. 
- **The Problem:** Traditional methods of finding blood (phone calls, social media posts) are often disorganized, slow, and unreliable during emergencies.
- **The Solution:** A dedicated platform where donors can register their availability, and recipients can easily search and request blood based on location and blood group.
- **The Goal:** To save lives by reducing the time it takes to find a matching donor.

### 🤝 How It Helps
1.  **For Recipients:** Instantly find donors in your specific area (District/Upazila) with the required blood group.
2.  **For Donors:** Manage your donation history and receive requests from people who genuinely need help.
3.  **For Communities:** Volunteers and Admins can organize camps, manage requests, and ensure the platform remains safe and spam-free.

---

## 📱Platform Overview

![BloodBond Platform Showcase](https://i.ibb.co.com/RTY5Rfcz/Blood-Bond.png)

*A comprehensive view of BloodBond's key features: Homepage, Donation Requests, Donor Search, Blood Compatibility Chart, Educational Blog, and Analytics Dashboard.*

---

## 🚀 Key Features

### 👤 User Roles & Dashboards
*   **Donors:** 
    *   Create and manage blood donation requests.
    *   View recent requests in their area.
    *   Update profile and availability status.
*   **Volunteers:** 
    *   All donor features.
    *   Update statuses of donation requests.
    *   Manage blog content.
*   **Admins:** 
    *   Full system control (User management, blocking, role promotion).
    *   Detailed analytics and statistics.
    *   Content management (Blogs, Announcements).

### 🛠 Core Functionality
*   **Advanced Search:** Filter donors by `Blood Group`, `District`, and `Upazila` with real-time results.
*   **Request Management:** Track lifecycle of a request: `Pending` -> `In Progress` -> `Done` / `Canceled`.
*   **Authentication:** Secure Login/Registration via Email & Password (using Firebase).
*   **Interactive UI:** Smooth animations, loading skeletons, and premium glassmorphism design.
*   **Dark Mode:** Fully supported system-wide dark/light theme toggle.
*   **Blog System:** Read and write health-related articles.
*   **Payment Integration:** Fund the platform securely via Stripe.

---

## 💻 Technology Stack

### Frontend
-   **React.js (Vite):** Fast and modular UI library.
-   **Tailwind CSS & DaisyUI:** Rapid, responsive, and beautiful styling.
-   **Framer Motion:** For smooth, complex animations and page transitions.
-   **Recharts:** Data visualization for Admin Analytics.
-   **SweetAlert2:** Interactive and beautiful alerts/modals.
-   **Axios:** Efficient HTTP client for API requests.

### Backend
-   **Node.js & Express.js:** Robust server-side runtime and framework.
-   **MongoDB:** NoSQL database for flexible data storage.
-   **JWT (JSON Web Token):** Secure authentication and authorization.

### Tools & Services
-   **Firebase:** User authentication.
-   **Stripe:** Payment gateway integration.
-   **TanStack Query:** Powerful asynchronous state management.
-   **ImgBB:** Image hosting for user profiles.
-   **Vercel:** Deployment platform.

---

## 📂 Project Structure

```
BloodBond/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Pages/          # Full page views
│   │   ├── hooks/          # Custom React hooks (useAuth, useAxiosSecure)
│   │   ├── providers/      # Context providers (Auth, Theme)
│   │   └── Routes/         # Router configuration
│   └── ...
└── server/                 # Backend Node.js Application
    ├── index.js            # Main server entry & API routes
    └── ...
```

---

## 🛠 Local Development Guide

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Mohosinin/BloodBond_Client.git
    cd BloodBond
    ```

2.  **Setup Server:**
    ```bash
    cd server
    npm install
    # Create .env file with DB_USER, DB_PASS, ACCESS_TOKEN_SECRET, STRIPE_SECRET_KEY
    nodemon index.js
    ```

3.  **Setup Client:**
    ```bash
    cd client
    npm install
    # Create .env.local file with Firebase & Stripe keys
    npm run dev
    ```

---

## 📧 Contact
Developed by **Mohosin**.  
Feel free to reach out for collaboration or feedback!
