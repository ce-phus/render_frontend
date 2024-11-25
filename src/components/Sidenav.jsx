import React, { forwardRef, useEffect, useState } from 'react';
import { IoHome } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { RiGolfBallFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { GiCrackedBallDunk } from "react-icons/gi";
import { LuCross } from "react-icons/lu";
import { FcAbout } from "react-icons/fc";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { FaVideo, FaClapperboard  } from "react-icons/fa6";
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { logo, logo1 } from '../assets';
import { Link } from 'react-router-dom';
import Popup from './Popup';
import { IoBagCheckOutline } from "react-icons/io5";


const Sidenav = forwardRef(({ isSidebarOpen }, ref) => {
  const getProfileReducer = useSelector((state) => state.getProfileReducer);
  const { profile } = getProfileReducer
  const dispatch = useDispatch();
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false)
  
  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/'); 
  };
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleDropdown = ()=> {
    setIsDropDownOpen((prev)=> !prev)
  }

  return (
    <div>
      <aside
        id='logo-sidebar'
        ref={ref}
        className={`fixed top-5 md:mx-3 rounded-lg left-0 z-50 w-64 h-screen md:h-[920px]  pt-10 transition-transform bg-white border border-gray-300 sm:translate-x-0 dark:bg-dark dark:border-gray-700 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} mt-4`}
        aria-label='Sidebar'
        role="navigation"
      >
        <Link to="/" className="flex justify-center items-center mt-0">
          <img src={logo} className="w-[120px] mb-2" alt="Logo Name" />
        </Link>
        <hr className='my-3 dark:border-gray-700 border-gray-300 shadow mx-2'/>

        <div className='h-full px-3 overflow-y-auto'>

        
          <ul className='space-y-2 font-medium'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `flex dark:text-white gap-4 text-sm px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive ? 'bg-accent dark:bg-orange-900' : ''}`
                }
              >
                <IoHome className='mt-1 w-6 h-6 '/> Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/explore'
                className={({ isActive }) =>
                `flex dark:text-white gap-4 text-sm px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive ? 'bg-accent dark:bg-orange-900' : ''}`
                }
              >
                <MdOutlineExplore className='mt-1 w-6 h-6 ' /> Explore
              </NavLink>
            </li>


            <li>
              <NavLink
                to='/popular'
                className={({ isActive }) =>
                  `flex dark:text-white gap-4 text-sm px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive ? 'bg-accent dark:bg-orange-900' : ''}`
                }
              >
                <FaClapperboard className='mt-1 w-6 h-6 ' /> Scenes
              </NavLink>
            </li>
          </ul>
          <hr className='my-5 border- h-px rounded-full border-gray-300 dark:border-gray-500'/>

          <ul className='space-y-2 font-medium'>
          <li>
              <NavLink
                to={profile ? `/inbox/${profile.username}` : "#"}
                className={({ isActive }) =>
                  `flex dark:text-white gap-4 text-sm px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive ? 'bg-accent dark:bg-orange-900' : ''}`
                }
              >
                <AiFillMessage className='mt-1 w-6 h-6 ' /> Message
              </NavLink>
            </li>
          </ul>

          <hr className='my-5 h-px rounded-full border-gray-300 dark:border-gray-500'/>

          <ul className='space-y-2 font-medium'>
            <p className='text-dark dark:text-gray-400 tracking-wide text-xs uppercase'>New Post</p>
            <li>
              <button
                onClick={togglePopup}
                className='dark:text-dark text-white flex gap-4 px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 w-full'
              >
                <LuCross className='mt-1 dark:bg-white bg-dark w-6 h-6 rounded-md'/> 
                <span className='dark:text-white text-dark'>New Post</span>
              </button>
            </li>
          </ul>

          <hr className='my-5 h-px rounded-full border-gray-300 dark:border-gray-500'/>

          <ul className='space-y-2 font-medium'>
            <p className='text-dark dark:text-gray-400 tracking-wide text-xs uppercase'>Create a Custom Feed</p>
            <li>
              <NavLink
                to='/create'
                className={({ isActive }) =>
                  `flex dark:text-white gap-4 duration:500 px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive ? 'bg-accent dark:bg-orange-900' : ''}`
                }
              >
                <LuCross className='mt-1  w-6 h-6 '/> Create
              </NavLink>
            </li>
          </ul>

          <hr className='my-5 h-px rounded-full border-gray-300 dark:border-gray-500'/>

          <ul className='space-y-2 font-medium'>
            <p className='text-dark dark:text-gray-400 tracking-wide text-xs uppercase'>Resources</p>
            <li>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  `flex dark:text-white gap-4  px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 duration:500 ${isActive ? 'bg-accent dark:bg-orange-900' : ''}`
                }
              >
                <FcAbout className='mt-1 w-6 h-6 '/> About
              </NavLink>
            </li>
            <li className=''>
              <button
              onClick={toggleDropdown}
                to='/settings'
                className='flex dark:text-white gap-4 text-sm px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 w-full duration-500'
              >
                <CiSettings className='mt-1 w-6 h-6 '/> Settings
              </button>
              {isDropdownOpen && (
                <ul className='bg-white dark:bg-dark shadow-lg rounded-lg mt-2 w-40 z-10'>
                  <NavLink
                      to='/orders'
                      className='block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 hover:rounded-lg dark:hover:bg-gray-700'
                    >
                      <IoBagCheckOutline className='inline mr-2 w-5 h-5' /> You Orders
                    </NavLink>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex dark:text-white gap-4  w-full px-1 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
              >
                <MdOutlineLogout className='mt-1 w-6 h-6 '/> Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <Popup isPopupOpen={isPopupOpen} togglePopup={togglePopup} />
    </div>
  );
});

export default Sidenav;
