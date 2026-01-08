/**
 * MODIFIED BY: [Person 2 Name]
 * FEATURE: Blood Compatibility Route & Navigation Updates + Admin Analytics & Announcements
 * 
 * Changes Made:
 * - Added BloodCompatibility page import
 * - Added /blood-compatibility route
 * - Added Analytics dashboard page for admins
 * - Added Announcements management page for admins
 */

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Search from "../Pages/Search/Search";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import DonationRequestDetails from "../Pages/Home/Dashboard/DonationRequestDetails/DonationRequestDetails";
import Funding from "../Pages/Funding/Funding";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import CreateDonationRequest from "../Pages/Home/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/Home/Dashboard/MyDonationRequests/MyDonationRequests";
import UpdateDonationRequest from "../Pages/Home/Dashboard/UpdateDonationRequest/UpdateDonationRequest";
import MainDashboard from "../Pages/Home/Dashboard/MainDashboard/MainDashboard";
import AddProduct from "../Pages/Home/Dashboard/AddProduct/AddProduct";
import Profile from "../Pages/Home/Dashboard/Profile/Profile";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Pages/Home/Dashboard/AllUsers/AllUsers";
import AllBloodDonationRequests from "../Pages/Home/Dashboard/AllBloodDonationRequests/AllBloodDonationRequests";
import ContentManagement from "../Pages/Home/Dashboard/ContentManagement/ContentManagement";
import ManageProduct from "../Pages/Home/Dashboard/ManageProduct/ManageProduct";
import AdminOrVolunteerRoute from "./AdminOrVolunteerRoute";

// NEW: Blood Compatibility Page - Added by [Person 2 Name]
import BloodCompatibility from "../Pages/BloodCompatibility/BloodCompatibility";

// NEW: Analytics & Announcements Pages - Added by [Person 2 Name]
import Analytics from "../Pages/Analytics/Analytics";
import Announcements from "../Pages/Announcements/Announcements";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/search',
        element: <Search></Search>
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/blog/:id',
        element: <BlogDetails></BlogDetails>
      },
      {
        path: '/donation-requests',
        element: <DonationRequests></DonationRequests>
      },
      {
        path: '/donation-request-details/:id',
        element: <DonationRequestDetails></DonationRequestDetails>
      },
      {
        path: '/funding',
        element: <PrivateRoute><Funding></Funding></PrivateRoute>
      },
      // NEW ROUTE: Blood Compatibility Chart - Added by [Person 2 Name]
      {
        path: '/blood-compatibility',
        element: <BloodCompatibility></BloodCompatibility>
      },
    ],
  },
   {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'create-donation-request',
        element: <CreateDonationRequest></CreateDonationRequest>
      },
      {
        path: 'my-donation-requests',
        element: <MyDonationRequests></MyDonationRequests>
      },
      {
        path: 'update-donation-request/:id',
        element: <UpdateDonationRequest></UpdateDonationRequest>
      },
      {
        path: 'donation-request-details/:id',
        element: <DonationRequestDetails></DonationRequestDetails>
      },
      {
        index: true,
        element: <MainDashboard></MainDashboard>
      },
      {
        path: 'add-product',
        element: <AddProduct></AddProduct>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'all-users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'all-blood-donation-request',
        element: <AdminOrVolunteerRoute><AllBloodDonationRequests></AllBloodDonationRequests></AdminOrVolunteerRoute>
      },
      {
        path: 'content-management',
        element: <AdminOrVolunteerRoute><ContentManagement></ContentManagement></AdminOrVolunteerRoute>
      },
      {
        path: 'manage-product',
        element: <ManageProduct></ManageProduct>
      },
      // NEW ROUTES: Analytics & Announcements - Added by [Person 2 Name]
      {
        path: 'analytics',
        element: <AdminRoute><Analytics></Analytics></AdminRoute>
      },
      {
        path: 'announcements',
        element: <AdminRoute><Announcements></Announcements></AdminRoute>
      }
    ]
  }
]);

export default router;
