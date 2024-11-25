import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { close } from '../assets';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const ProfilePosts = ({ posts }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); 

  const photos = posts.photos || [];

  const isDevelopment = import.meta.env.MODE ==='development'
  const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY
  const fullImageUrl = API_URL + posts.cover_photo;
  const fullProfileImageUrl = API_URL + posts.profile_photo;

  const slides = [fullImageUrl, ...photos.map((photo) => API_URL + photo.photo)];

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'kes' }).format(price);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }

  return (
    <div className='mt-5 mx-3 mb-10' isPopupOpen={isPopupOpen} togglePopup={togglePopup}>
      <Link className='' onClick={togglePopup}>
          <div>
              <img src={fullImageUrl} className='md:h-[500px] w-full h-[200px]'/>
          </div>
      </Link>
      {isPopupOpen && (
        <motion.div initial={{scale:0, opacity:0}}
        animate={{scale:0.9, opacity:2}} className='z-50  pt-20 fixed inset-0 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 bg-white/75 dark:bg-dark/85 rounded-lg backdrop-blur-m'>
          <div className='absolute top-0 right-0' onClick={togglePopup}>
                <img src={close} className='dark:text-white cursor-pointer'/>
            </div>
        <div className='bg-white dark:bg-dark p-4 rounded-lg shadow-lg h-[900px] transition duration-1500 ease-in-out max-w-8xl mx-auto'>
          <div className='mb-4'>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 md:gap-4 dark:bg-dark dark:text-white rounded-lg shadow-lg overflow-y-auto mb-20'>
              <div className='mx-5 overflow-y-auto'>
                  <div className="w-full h-full relative overflow-hidden">
                    {/* Slider Images */}
                    <div
                      className="flex transition-transform duration-500"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        width: `${slides.length * 100}%`,
                      }}
                    >
                      {slides.map((slide, index) => (
                        <div
                        key={index}
                        className="w-full h-[800px]"
                        style={{ flex: '0 0 auto' }}
                      >
                          <img
                            src={slide}
                            className="object-cover w-full h-full rounded-lg max-w-[900px]"
                            alt={`Slide ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black"
                      onClick={handlePrev}
                    >
                      <BsChevronCompactLeft size={24} />
                    </button>
                    <button
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black"
                      onClick={handleNext}
                    >
                      <BsChevronCompactRight size={24} />
                    </button>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentSlide ? 'bg-blue-500' : 'bg-gray-400'
                          }`}
                          onClick={() => setCurrentSlide(index)}
                        />
                      ))}
                    </div>
                  </div>
                 
                </div>
                <div className='flex flex-col overflow-y-auto h-4/5 max-w-3xl mx-auto'>
                  <h3 className='text-3xl dark:text-white tracking-wide text-secondary uppercase mb-3'>{posts.title}</h3>
                  <h2 className='text-3xl font-bold mb-3 dark:text-white'>{formatPrice(posts?.price)}</h2>

                  <hr className='my-5 border- h-px rounded-full border-gray-300 dark:border-gray-500'/>

                  <h2 className='text-xl font-medium dark:text-white'>Detailed Description</h2>
                  <p className='text-gray-600 dark:text-gray-400 text-sm mx-1 tracking-wide mb-2'>{posts.description}</p>
                  <div className='grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3'>
                    <div className=''>
                        <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                            <span className=' text-dark dark:text-white'>Country</span>  :  {posts?.country}
                        </p>
                        <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                            <span className=' text-dark dark:text-white'>City</span>  :  {posts?.city}
                        </p>
                        <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                            <span className=' text-dark dark:text-white'>Postal Code</span>  :  {posts?.postal_code}
                        </p>
                        <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                            <span className=' text-dark dark:text-white'>Street Address</span>  :  {posts?.street_address}
                        </p>
                    </div>
                    <div className=''>
                      
                        <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                            <span className=' text-dark dark:text-white'>Price</span>  :  {formatPrice(posts?.price)}
                        </p>
                
                    </div>

              

                    <div className=''>
                        <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                            <span className=' text-dark dark:text-white'>Advert Type</span>  :  {posts?.advert_type}
                        </p>
                        
                    </div>
                    
                </div>
                <div className='mt-1 mb-3 mx-3 flex'>
                    <p className='text-lg font-medium'>Views: {posts.views}</p>
                    <button onClick={togglePopup} className='text-lg font-medium ml-4'>Comments: </button>

                </div>
                </div>
            </div>
          </div>
        </div>
      </motion.div>
      )}
      
    </div>
  )
}

export default ProfilePosts