
import { img1, logo1, google, logo } from '../assets';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className='flex pt-20 min-h-screen pb-20 dark:bg-dark'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 container mx-auto'>
        
        <div className=''>
          <div className='flex space-x-2 mx-2'>
            
            <img src={logo} className='w-[200px]'/>
          </div>
          <div className='w-[300px] mx-2'>
            <Link className='flex space-x-4 mt-3 bg-white dark:bg-dark dark:text-white rounded-full p-2.5 border border-gray-400 dark:border-gray-700 hover:scale-105 duration:700 eas-in-out transition'>
            <img
            src={google}
            className=''/>
            <p className='mt-2 text-xl font-medium'>Sign in with Google</p>
            </Link>
            
          </div>
          <div className=''>
            {children}
          </div>
        </div>
        <div className='w-full hidden md:block '>
          <img src={img1} className='rounded-t-lg w-full h-full'/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
