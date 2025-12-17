# BloodBond Client

This is the frontend client for the BloodBond application, built with React, Vite, and Tailwind CSS. It handles the user interface for donors, recipients, and administrators.

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.
- A Firebase project for authentication.
- A Stripe account for payment testing.

### Installation

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root of the `client` directory and add the following variables:
    ```env
    VITE_apiKey=your_firebase_api_key
    VITE_authDomain=your_firebase_auth_domain
    VITE_projectId=your_firebase_project_id
    VITE_storageBucket=your_firebase_storage_bucket
    VITE_messagingSenderId=your_firebase_messaging_sender_id
    VITE_appId=your_firebase_app_id
    VITE_Payment_Gateway_PK=your_stripe_publishable_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will act as `http://localhost:5173` (default Vite port).

## 📜 Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the app for production.
-   `npm run lint`: Runs ESLint to check for code quality.
-   `npm run preview`: Preview the production build locally.

## 📦 Key Dependencies

-   **React & Vite:** Core framework and build tool.
-   **React Router DOM:** Handling client-side navigation.
-   **Firebase:** User authentication (Login/Register).
-   **@tanstack/react-query:** Efficient data fetching and caching.
-   **Axios:** Making HTTP requests to the backend.
-   **Tailwind CSS & DaisyUI:** Rapid UI development and styling.
-   **SweetAlert2:** Interactive popup alerts.
-   **Stripe JS:** Handling secure payments on the frontend.
