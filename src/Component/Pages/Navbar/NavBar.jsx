import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hook/useAuth';

const NavBar = () => {

    const { user, logOut } = useAuth()

    const handleLogout = () => {
        logOut()
            .then(res => {
                console.log(res.user);
            })
            .catch(error => {
                console.log(error);
            })

    }


    const navLinks =
        <>
            <li> <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}>Home</NavLink></li>
            <li> <NavLink to="/allfood" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn whitespace-nowrap btn-warning " : ""}>All Food</NavLink></li>
            <li> <NavLink to="/blogs" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}> Blogs</NavLink></li>
            <li> <NavLink to="/login" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}>{user ? <button onClick={handleLogout} >Logout</button> : "Login"} </NavLink></li>
        </>

    const subNavLinks =
        <>
            <li> <NavLink to="/addedFood" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}>My added food</NavLink></li>
            <li> <NavLink to="/addAFood" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn whitespace-nowrap btn-warning " : ""}>Add a food</NavLink></li>
            <li> <NavLink to="/orderedFood" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}> My ordered food</NavLink></li>
        </>


    return (
        <>
            <div className='py-2 bg-[#000B33] border-b-2 border-neutral-200 text-white'>
                <div className="navbar mx-auto max-w-7xl ">
                    <div className="navbar-start">
                        <Link to='/' className="flex items-center">
                            <span className="self-center text-2xl ml-3 md:ml-10 font-semibold whitespace-nowrap dark:text-white">FoodieFleet</span>
                        </Link>
                    </div>
                    <div className=" hidden md:flex">
                        <ul className="p-4 flex items-center gap-10">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {user?.photoURL ?
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <img className="md:w-24 w-14 mr-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" src={user.photoURL} alt="" />
                                </label>
                                <ul tabIndex={0} className="flex items-center justify-center flex-col gap-1 dropdown-content mt-8 z-10 p-4 shadow bg-[#000B33] rounded-box w-40">
                                    {subNavLinks}
                                </ul>
                            </div> : ''}


                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="md:hidden">
                                <div className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </div>
                            </label>
                            <ul tabIndex={0} className=" flex items-center justify-center flex-col gap-1 dropdown-content mt-8 z-10 p-4 shadow bg-[#000B33] rounded-box w-24">
                                {navLinks}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default NavBar;