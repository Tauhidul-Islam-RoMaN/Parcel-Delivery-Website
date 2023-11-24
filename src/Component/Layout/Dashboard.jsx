import { FaListUl, FaBoxOpen, FaUsers, FaRegStar } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FcStatistics } from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";

const adminRoute =
    <>
        <h2 className="text-2xl font-medium"> Admin Dashboard </h2>
        <li> <NavLink to='/dashboard/statistics' className="text-lg"> <FcStatistics></FcStatistics> Statistics </NavLink> </li>
        <li> <NavLink to='/dashboard/allParcel' className="text-lg"> <FaBoxOpen></FaBoxOpen> All Parcel </NavLink> </li>
        <li> <NavLink to='/dashboard/allDeliveryMan' className="text-lg"> <MdOutlineDeliveryDining></MdOutlineDeliveryDining> All Delivery Man </NavLink> </li>
        <li> <NavLink to='/dashboard/allUsers' className="text-lg"> <FaUsers></FaUsers> All Users </NavLink> </li>
    </>
const userRoute =
    <>
        <h2 className="text-2xl font-medium"> User Dashboard </h2>
        <li> <NavLink to='/dashboard/booking' className="text-lg"> <BiPurchaseTagAlt></BiPurchaseTagAlt> Book A Parcel </NavLink> </li>
        <li> <NavLink to='/dashboard/myParcel' className="text-lg"> <FaBoxOpen></FaBoxOpen> My Parcel </NavLink> </li>
        <li> <NavLink to='/dashboard/myProfile' className="text-lg"> <AiOutlineProfile></AiOutlineProfile> My Profile </NavLink> </li>
    </>

const deliveryManRoute =
    <>
        <h2 className="text-2xl font-medium"> Delivery Man Dashboard </h2>
        <li> <NavLink to='/dashboard/deliveryList' className="text-lg"> <FaListUl></FaListUl> My Delivery List </NavLink> </li>
        <li> <NavLink to='/dashboard/review' className="text-lg"> <FaRegStar></FaRegStar> My Review </NavLink> </li>
    </>

const Dashboard = () => {
    return (
        <>
            <div className="flex max-w-6xl flex-col md:flex-row mx-auto">
                <div className="md:w-80 md:min-h-screen bg-[#3bbcc0] ">
                    <div className="flex">
                        <ul className="menu flex flex-col md:pt-16 p-4">
                            {adminRoute}
                        </ul>
                        <ul className="menu flex flex-col md:pt-16 p-4">
                            {userRoute}
                        </ul>
                        <ul className="menu flex flex-col md:pt-16 p-4">
                            {deliveryManRoute}
                        </ul>
                    </div>
                    <div className="divider"></div>
                    {/* <div className="dropdown">
                        <label tabIndex={0} className="md:hidden">
                            <div className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </div>
                        </label>
                        <ul tabIndex={0} className=" flex items-center justify-center flex-col gap-1 dropdown-content mt-5 z-10 p-4 shadow bg-[#3bbcc0] rounded-box w-28">
                            {adminRoute}
                        </ul>
                    </div> */}
                </div>
                <div className="p-8 flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;