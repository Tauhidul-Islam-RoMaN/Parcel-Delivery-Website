import { FaListUl, FaBoxOpen, FaUsers, FaRegStar, FaHome } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FcStatistics } from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAxiosPublic from "../Hook/useAxiosPublic";

const adminRoute =
    <>
        <h2 className="text-2xl font-medium"> Admin Dashboard </h2>
        <li> <NavLink to='/dashboard/statistics' className="text-lg"> <FcStatistics></FcStatistics> Statistics </NavLink> </li>
        <li> <NavLink to='/dashboard/allParcel' className="text-lg"> <FaBoxOpen></FaBoxOpen> All Parcel </NavLink> </li>
        <li> <NavLink to='/dashboard/allDeliveryMan' className="text-lg"> <MdOutlineDeliveryDining></MdOutlineDeliveryDining> All Delivery Man </NavLink> </li>
        <li> <NavLink to='/dashboard/allUsers' className="text-lg"> <FaUsers></FaUsers> All Users </NavLink> </li>
    </>
// const userRoute =
//     <>
//         <h2 className="text-2xl font-medium"> User Dashboard </h2>
//         <li> <NavLink to='/dashboard/booking' className="text-lg"> <BiPurchaseTagAlt></BiPurchaseTagAlt> Book A Parcel </NavLink> </li>
//         <li> <NavLink to='/dashboard/myParcel' className="text-lg"> <FaBoxOpen></FaBoxOpen> My Parcel </NavLink> </li>
//         <li> <NavLink to='/dashboard/myProfile' className="text-lg"> <AiOutlineProfile></AiOutlineProfile> My Profile </NavLink> </li>
//     </>

const deliveryManRoute =
    <>
        <h2 className="text-2xl font-medium"> Delivery Man Dashboard </h2>
        <li> <NavLink to='/dashboard/deliveryList' className="text-lg"> <FaListUl></FaListUl> My Delivery List </NavLink> </li>
        <li> <NavLink to='/dashboard/review' className="text-lg"> <FaRegStar></FaRegStar> My Review </NavLink> </li>
    </>

const Dashboard = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    return (
        <>
            <div className="flex max-w-6xl flex-col md:flex-row mx-auto">
                <div className="md:w-80 md:min-h-screen bg-[#3bbcc0] ">
                    <div className="flex">
                        <ul className="menu flex flex-col md:pt-16 p-4">
                            {adminRoute}
                        </ul>
                        <ul className="menu flex flex-col md:pt-16 p-4">
                            {/* {userRoute} */}
                        </ul>
                        <ul className="menu flex flex-col md:pt-16 p-4">
                            {/* {deliveryManRoute} */}
                        </ul>
                    </div>
                    <div className="divider"></div>
                    <>
                        <ul className="menu flex flex-col text-lg  p-4">
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