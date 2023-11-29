import { FaListUl, FaBoxOpen, FaUsers, FaRegStar, FaHome } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FcStatistics } from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hook/useAxiosPublic";

// const adminRoute =
//     <>
//         <h2 className="text-2xl font-medium"> Admin Dashboard </h2>
//         <li> <NavLink to='/dashboard/statistics' className="text-lg text-black"> <FcStatistics></FcStatistics> Statistics </NavLink> </li>
//         <li> <NavLink to='/dashboard/allParcel' className="text-lg text-black"> <FaBoxOpen></FaBoxOpen> All Parcel </NavLink> </li>
//         <li> <NavLink to='/dashboard/allDeliveryMan' className="text-lg text-black"> <MdOutlineDeliveryDining></MdOutlineDeliveryDining> All Delivery Man </NavLink> </li>
//         <li> <NavLink to='/dashboard/allUsers' className="text-lg text-black"> <FaUsers></FaUsers> All Users </NavLink> </li>
//     </>
// const userRoute =
//     <>
//         <h2 className="text-2xl font-medium"> User Dashboard </h2>
//         <li> <NavLink to='/dashboard/booking' className="text-lg text-black"> <BiPurchaseTagAlt></BiPurchaseTagAlt> Book A Parcel </NavLink> </li>
//         <li> <NavLink to='/dashboard/myParcel' className="text-lg text-black"> <FaBoxOpen></FaBoxOpen> My Parcel </NavLink> </li>
//         <li> <NavLink to='/dashboard/myProfile' className="text-lg text-black"> <AiOutlineProfile></AiOutlineProfile> My Profile </NavLink> </li>
//     </>

// const deliveryManRoute =
//     <>
//         <h2 className="text-2xl font-medium"> Delivery Man Dashboard </h2>
//         <li> <NavLink to='/dashboard/deliveryList' className="text-lg text-black"> <FaListUl></FaListUl> My Delivery List </NavLink> </li>
//         <li> <NavLink to='/dashboard/review' className="text-lg text-black"> <FaRegStar></FaRegStar> My Review </NavLink> </li>
//     </>

const Dashboard = () => {
    const axiosPublic = useAxiosPublic()
    const { data: Users = [], refetch } = useQuery({
        queryKey: ['Users'],
        queryFn: async () => {
            const result = await axiosPublic.get(`/users`)
            const data = await result.data
            return data
        }
    })
    console.log(Users);

    const [selectRole, setSelectRole] = useState([])
    const { loading, user } = useAuth()
    useEffect(() => {
        const sorted = Users?.filter(man => man.email === user?.email)
        setSelectRole(sorted)
        refetch()
    }, [Users, user?.email,refetch])



    if (loading) {
        return <div className="flex justify-center items-center text-5xl"><span className="loading loading-spinner text-accent"></span></div>
    }

    console.log(selectRole);
    console.log(selectRole[0]?.role);


    return (
        <>
            <div className="flex max-w-6xl flex-col md:flex-row mx-auto">
                <div className="md:w-80 md:min-h-screen bg-[#3bbcc0] ">
                    <div className="flex">
                        {loading ? <div className="flex justify-center items-center text-5xl"><span className="loading loading-spinner text-accent"></span></div> :
                            selectRole[0]?.role === "admin" &&
                            <ul className="menu flex flex-col md:pt-16 p-4">
                                <>
                                    <h2 className="text-2xl text-black font-medium"> Admin Dashboard </h2>
                                    <li> <NavLink to='/dashboard/statistics' className="text-lg text-black"> <FcStatistics></FcStatistics> Statistics </NavLink> </li>
                                    <li> <NavLink to='/dashboard/allParcel' className="text-lg text-black"> <FaBoxOpen></FaBoxOpen> All Parcel </NavLink> </li>
                                    <li> <NavLink to='/dashboard/allDeliveryMan' className="text-lg text-black"> <MdOutlineDeliveryDining></MdOutlineDeliveryDining> All Delivery Man </NavLink> </li>
                                    <li> <NavLink to='/dashboard/allUsers' className="text-lg text-black"> <FaUsers></FaUsers> All Users </NavLink> </li>
                                </>
                            </ul>
                        }
                        {
                            selectRole[0]?.role === "user" &&
                            <ul className="menu flex flex-col md:pt-16 p-4">
                                <>
                                    <h2 className="text-2xl text-black font-medium"> User Dashboard </h2>
                                    <li> <NavLink to='/dashboard/booking' className="text-lg text-black"> <BiPurchaseTagAlt></BiPurchaseTagAlt> Book A Parcel </NavLink> </li>
                                    <li> <NavLink to='/dashboard/myParcel' className="text-lg text-black"> <FaBoxOpen></FaBoxOpen> My Parcel </NavLink> </li>
                                    <li> <NavLink to='/dashboard/myProfile' className="text-lg text-black"> <AiOutlineProfile></AiOutlineProfile> My Profile </NavLink> </li>
                                </>
                            </ul>
                        }
                        {
                            selectRole[0]?.role === "delivery-man" &&
                            <ul className="menu flex flex-col md:pt-16 p-4">
                                <>
                                    <h2 className="text-2xl text-black font-medium"> Delivery Man Dashboard </h2>
                                    <li> <NavLink to='/dashboard/deliveryList' className="text-lg text-black"> <FaListUl></FaListUl> My Delivery List </NavLink> </li>
                                    <li> <NavLink to='/dashboard/review' className="text-lg text-black"> <FaRegStar></FaRegStar> My Review </NavLink> </li>
                                </>
                            </ul>
                        }
                    </div>
                    <div className="divider"></div>
                    <>
                        <ul className="menu flex flex-col text-lg text-black  p-4">
                            <li> <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}> <FaHome></FaHome> Home</NavLink></li>
                        </ul>

                    </>
                </div>
                <div className="p-8 flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;