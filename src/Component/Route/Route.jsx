import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorElement from "../Pages/ErrorElement/ErrorElement";
import Home from "../Pages/Home/Home";
import Notification from "../Pages/Notification/Notification";
import Dashboard from "../Layout/Dashboard";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminDashboard from "../Dashboard/Dashboard/AdminDashboard";

const myCreatedRoute = createBrowserRouter([
    {
        path: '/',
        errorElement:<ErrorElement></ErrorElement>,
        element:<MainLayout></MainLayout>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/notification',
                element: <Notification></Notification>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/',
        errorElement:<ErrorElement></ErrorElement>,
        element:<Dashboard></Dashboard>,
        children: [
            {
                path:'/dashboard',
                element: <AdminDashboard></AdminDashboard>
            },
        ]
    },
])

export default myCreatedRoute;