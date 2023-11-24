import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Navbar/Navbar";

const Dashboard = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;