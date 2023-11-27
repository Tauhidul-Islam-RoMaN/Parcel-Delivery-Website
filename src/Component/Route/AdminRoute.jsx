import { NavLink, Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import PropTypes from 'prop-types';
import useUsers from "../Hook/useUsers";
import { useEffect, useState } from "react";
import { FcStatistics } from "react-icons/fc";
import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";

const AdminRoute = () => {
    const [admin, setAdmin] = useState([])
    const [route, setRoute] = useState('')
    const { loading, user } = useAuth()
    const role = ""
    const [Users, refetch] = useUsers(role)
    // console.log(Users);
    useEffect(() => {
        const sorted = Users.filter(man => man.email === user?.email)
        setAdmin(sorted)
    }, [Users, user?.email])

    if (loading) {
        return <div className="flex justify-center items-center text-5xl"><span className="loading loading-spinner text-accent"></span></div>
    }
    
    console.log(admin);
    console.log(admin[0]?.role);
    if (admin[0]?.role === "admin") {
        setRoute(
            <>
                <h2 className="text-2xl font-medium"> Admin Dashboard </h2>
                <li> <NavLink to='/dashboard/statistics' className="text-lg"> <FcStatistics></FcStatistics> Statistics </NavLink> </li>
                <li> <NavLink to='/dashboard/allParcel' className="text-lg"> <FaBoxOpen></FaBoxOpen> All Parcel </NavLink> </li>
                <li> <NavLink to='/dashboard/allDeliveryMan' className="text-lg"> <MdOutlineDeliveryDining></MdOutlineDeliveryDining> All Delivery Man </NavLink> </li>
                <li> <NavLink to='/dashboard/allUsers' className="text-lg"> <FaUsers></FaUsers> All Users </NavLink> </li>
            </>
        )
    }
    console.log(route);

    return route
};

export default AdminRoute;