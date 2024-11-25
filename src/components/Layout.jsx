import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidenav from './Sidenav';
import Header from './Header';
import { useRef } from 'react';
import { Login } from '../pages';


const Layout = ({ children }) => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (!userInfo) {
    return (
      <div className='dark:bg-dark'>
        <Login />
        </div>
        
    );
  }

  return (
    <div className='min-h-screen overflow-y-auto dark:bg-dark flex'>
      <Header toggleSidebar={toggleSidebar} />
      <Sidenav isSidebarOpen={isSidebarOpen} ref={sidebarRef}/>
      <div className='flex pt-20 justify-center flex-grow md:ml-64 '>
        {children}
      </div>
    </div>
  );
};

export default Layout;
