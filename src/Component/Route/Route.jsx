import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorElement from "../Pages/ErrorElement/ErrorElement";
import Home from "../Pages/Home/Home";
import Notification from "../Pages/Notification/Notification";
import Dashboard from "../Layout/Dashboard";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllDeliveryMan from "../Dashboard/Admin/AllDeliveryMan/AllDeliveryMan";
import Statistics from "../Dashboard/Admin/Statistics/Statistics";
import AllParcel from "../Dashboard/Admin/AllParcel/AllParcel";
import AllUsers from "../Dashboard/Admin/AllUsers/AllUsers";
import BookAParcel from "../Dashboard/User/BookAParcel/BookAParcel";
import MyParcel from "../Dashboard/User/MyParcel/MyParcel";
import MyProfile from "../Dashboard/User/MyProfile/MyProfile";
import MyDeliveryList from "../Dashboard/DeliveryMan/MyDeliveryList/MyDeliveryList";
import MyReview from "../Dashboard/DeliveryMan/MyReview/MyReview";
import UpdateParcel from "../Dashboard/User/UpdateParcel/UpdateParcel";
import PrivateRoute from "./PrivateRoute";

const myCreatedRoute = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorElement></ErrorElement>,
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/notification',
                element: <Notification></Notification>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        errorElement: <ErrorElement></ErrorElement>,
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin route
            {
                path: 'statistics',
                element: <Statistics></Statistics>
            },
            {
                path: 'allParcel',
                element: <AllParcel></AllParcel>
            },
            {
                path: 'allDeliveryMan',
                element: <AllDeliveryMan></AllDeliveryMan>
            },
            {
                path: 'allUsers',
                element: <AllUsers></AllUsers>
            },
            // user route
            {
                path: 'booking',
                element: <BookAParcel></BookAParcel>
            },
            {
                path: 'updateParcel/:id',
                element: <UpdateParcel></UpdateParcel>,
                loader: ({params}) => fetch(`https://assignment-12-server-pied.vercel.app/bookings/${params.id}`)
            },
            {
                path: 'myParcel',
                element: <MyParcel></MyParcel>,
                
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            // delivery man Profile
            {
                path: 'deliveryList',
                element: <MyDeliveryList></MyDeliveryList>
            },
            {
                path: 'review',
                element: <MyReview></MyReview>
            },

        ]
    },
])

export default myCreatedRoute;