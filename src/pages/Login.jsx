import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import { AuthLayout } from '../components';
import { FaApple } from "react-icons/fa6";
import { game } from '../assets';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const {loading, error, userInfo } = userLoginReducer;
  const navigate = useNavigate();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate('/')
  };
  return (
    <AuthLayout>
      {loading }
      <form className='mx-5' onSubmit={submitHandler}>
        {error}
          <div className='mb-5 mt-10'>
            <label className='block mb-2 text-sm font-medium text-secondary dark:text-gray-300'>Email</label>
            <input
              className='bg-gray-50 dark:bg-gray-700 block border border-gray-300 placeholder-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full'
              type='email'
              placeholder='enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-5 mt-10'>
            <label className='block mb-2 text-sm font-medium text-secondary dark:text-gray-300'>Password</label>
            <input
              className='bg-gray-50 dark:bg-gray-700 block border border-gray-300 placeholder-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-800 dark:focus:yellow-blue-500 p-2.5 rounded-lg w-full'
              type='password'
              placeholder='enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='text-white focus:ring-blue-800 hover:bg-blue-700 bg-blue-600 text-center px-5 py-2.5 sm:auto rounded-lg'
          >
            Sign In
          </button>
        </form>
        <div className='flex flex-col text-light'>
          <div className='mt-10 text-secondary dark:text-gray-400 text-xl mx-3'>
            Do not have an account?
          </div>
          <div className='flex flex-row-reverse mt-3 mr-3'>
            <Link to='/register'>
              <button className='text-white bg-blue-600 hover:bg-blue-700 text-center rounded-lg p-3 sm:auto'>
                Register
              </button>
            </Link>
          </div>
          <div className='flex flex-col md:flex-row space-x-5 mt-4 space-y-3 md:space-y-0'>
            <Link>
              <div className='bg-white px-6 ml-4 py-4 rounded-full flex dark:bg-dark border border-gray-200 shadow-lg dark:border-gray-700 space-x-2 transition duration:700 hover:scale-105 ease-in-out'>
                  <img
                  src={game}
                  className='w-10 h-10'/>
                  <div className='flex flex-col spce-y-2'>
                      <p className='text-gray-700 uppercase text-xs dark:text-white'>Get it on</p>
                      <h1 className='text-2xl tracking-wide dark:text-white font-bold text-gray-700'>Google Play</h1>
                  </div>
              </div>
            </Link>
            <Link>
              <div className='bg-white px-6 py-4 rounded-full flex dark:bg-dark border border-gray-200 shadow-lg dark:border-gray-700 space-x-2 transition duration:700 hover:scale-105 ease-in-out'>
              <FaApple className='w-10 h-10 dark:text-white'/>
                  <div className='flex flex-col spce-y-2'>
                      <p className='text-gray-700 uppercase text-xs dark:text-white'>Download on the</p>
                      <h1 className='text-2xl tracking-wide dark:text-white font-bold text-gray-700'>App Store</h1>
                  </div>
              </div>
            </Link>
          </div>
        </div>
    </AuthLayout>
  )
}

export default Login