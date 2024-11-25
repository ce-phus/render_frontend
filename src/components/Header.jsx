import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DarkMode from './Darkmode';
import { useNavigate } from 'react-router-dom';
import { profile_default } from '../assets';
import { getProfile } from '../actions/profileActions';
import Cart from './Cart';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getProfileReducer = useSelector((state) => state.getProfileReducer);
  const { profile } = getProfileReducer
  console.log('Profile Photo: ', profile?.profile_photo)

  useEffect(()=> {
    dispatch(getProfile())
}, [dispatch])

const handleSearchSubmit = (e) => {
  e.preventDefault(); 
  if (searchQuery.trim()) {
    navigate(`/search?query=${searchQuery}`);
  }
};
  
  return (
    <nav className='fixed z-20 w-full bg-white border-b dark:bg-dark  border-transparent flex items-center justify-between'>
      <div className='flex items-center'>
        <button
          className="flex items-center dark:text-white text-dark-600 p-3"
          onClick={toggleSidebar}
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
          aria-label="Toggle sidebar"
        >
          <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
        
      </div>
      <div></div>

      

      <div className="flex items-center mx-3 pt-2">
        <div className="md:w-[500px] mr-2">
          <form className="max-w-lg mx-auto" onSubmit={handleSearchSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p- ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Listings......"
                required
              />
            </div>
          </form>
        </div>
        <div>
          <Cart />
        </div>
        <DarkMode className="mr-"/>
        <div>
        <Link to={profile ? `/me` : '#'}>
            <img
              src={profile?.profile_photo || profile_default}
              className='w-10 h-10 mx-3 rounded-full object-cover'
              alt="Profile"
            />
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Header;
