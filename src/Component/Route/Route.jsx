import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorElement from "../Pages/ErrorElement/ErrorElement";
import Home from "../Pages/Home/Home";

const myCreatedRoute = createBrowserRouter([
    {
        path: '/',
        errorElement:<ErrorElement></ErrorElement>,
        element:<MainLayout></MainLayout>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            }
        ]
    }
])

export default myCreatedRoute;