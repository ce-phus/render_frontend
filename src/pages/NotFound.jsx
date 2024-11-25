import React from 'react'
import { Link } from 'react-router-dom'
import { svg } from '../assets'

const NotFound = () => {
  return (
    <div className='bg-cover h-screen object-contain bg-scroll dark:bg-dark'>
        <div className='flex flex-col items-center justify-center pt-20  mx-4'>
            <h3 className='font-medium text-xl mb-5 tracking-wide text-dark dark:text-white'>404</h3>
            <h1 className='text-6xl font-bold mb-5  text-black dark:text-white'>Page Not Found</h1>
            <p className='text-gray-500 font-medium dark:text-gray-300 text-xl mb-10'>Sorry, we couldn’t find the page you’re looking for.</p>
            <Link className='text-sm font-bold tracking-wide border px-1.5 py-2 rounded-lg hover:scale-105 duration-200 hover:bg-white hover:text-gray-400 text-black dark:text-white dark:hover:text-black/40' to={'/'}>
                Back to home
            </Link>
            <img src={svg} className='w-'/>
        </div>
    </div>
  )
}

export default NotFound