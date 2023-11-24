import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";


const Footer = () => {
    return (
        <>
            <div className="flex justify-evenly items-center lg:items-start flex-col lg:flex-row bg-slate-300 gap-10 py-10 px-10 ">
                <div className="flex-1">
                    <p className="text-justify font-semibold ">
                        <span className="text-[#3bbcc0] font-bold text-2xl">ShipSwiftly</span>  -Your Parcel's Express Journey Begins Here. Seamless delivery solutions for a world in motion. Swift, secure, and reliable. We bring your packages to life, delivering excellence with every mile. Ship with confidence, Swiftly to your destination.
                    </p>
                </div>
                <div className="flex-1 lg:pl-16 ">
                    <h2 className="text-xl  font-semibold mb-3 text-[#3bbcc0]">Important links</h2>
                    <div className=" flex flex-col lg:flex-col md:flex-row items-start justify-start font-semibold gap-3">
                        <button className=" hover:underline hover:text-blue-700"> Jobs</button>
                        <button className=" hover:underline hover:text-blue-700"> Contact</button>
                        <button className=" hover:underline hover:text-blue-700"> About us</button>
                        <button className=" hover:underline hover:text-blue-700"> Marketing</button>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-3 text-[#3bbcc0]">Connected With Our Socials</h2>
                    <div className="flex gap-5">
                        <FaFacebook className="text-5xl text-blue-700"></FaFacebook>
                        <FaLinkedin className="text-5xl text-blue-700"></FaLinkedin>
                        <FaYoutube className="text-5xl text-red-700"></FaYoutube>
                        <FaInstagram className="text-5xl text-amber-500"></FaInstagram>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-3 text-[#3bbcc0]">Signup for NewsLetter</h2>
                    <div className="lg:w-full flex gap-0">
                        <input type="name" name="name" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" placeholder="Enter your Email" required />
                        <button><SiMinutemailer className="text-6xl text-[#3bbcc0]"></SiMinutemailer></button>
                    </div>
                </div>
            </div>
            <div className="bg-[#3bbcc0] py-6">
                <div className="flex flex-col gap-5 lg:flex-row  items-center justify-evenly text-white">
                    <div className="font-semibold text-center text-xl">
                        <p>Copyright © 2023 - All right reserved by ShipSwiftly</p>
                    </div>
                    <div className="flex justify-evenly flex-col md:flex-row font-semibold lg:mr-5 gap-5">
                        <button className=" hover:underline hover:text-violet-700"> Terms & Condition</button>
                        <button className=" hover:underline hover:text-violet-700"> Privacy policy</button>
                        <button className=" hover:underline hover:text-violet-700"> Cookie policy</button>
                        <button className=" hover:underline hover:text-violet-700"> Legal Disclaimer</button>
                        <button className=" hover:underline hover:text-violet-700"> Support</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;