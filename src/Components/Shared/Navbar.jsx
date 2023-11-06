import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const handleLogOut = () => {
        logout()
            .then(toast.success("Logged Out Successfully"))
            .catch()
    }
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <Link to='/' className="h-full text-xl normal-case btn btn-ghost">
                        <img className="w-2/3" src={''} alt="" />
                    </Link>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="px-1 menu menu-horizontal">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/all-jobs'>All Jobs</NavLink></li>


                        {
                            user?.email ?
                                <>
                                    <li><NavLink to='/applied-jobs'>Applied Jobs</NavLink></li>
                                    <li><NavLink to='/add-job'>Add a Job</NavLink></li>
                                    <li><NavLink to='/my-jobs'>My Jobs</NavLink></li>
                                    <li><button className="" onClick={handleLogOut}>Log Out</button></li>
                                </> :
                                <li ><NavLink to='/login' className="flex items-center justify-center">Login</NavLink></li>
                        }
                    </ul>
                </div>
                <div className="hidden navbar-end lg:flex">

                </div>
            </div>
        </>
    );
};

export default Navbar;