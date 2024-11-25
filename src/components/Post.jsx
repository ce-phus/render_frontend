import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { AiFillMessage } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Post = ({ post }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const photos = post.photos || [];

  const { profile } = useSelector((state) => state.getProfileReducer);

  const isDevelopment = import.meta.env.MODE ==='development'
  const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY
  const fullImageUrl = API_URL + post.cover_photo;
  const fullProfileImageUrl = API_URL + post.profile_photo;

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

  return (
    <div className='bg-white dark:bg-dark space-y-3 flex flex-col mx-5 md:mx-0 md:w-[500px]'>
        <Link to={profile.username === post.user ? '/me' : `profile/${post.user}`}>
            <div className='flex justify-start space-x-2'>
                <img
                src={fullProfileImageUrl}
                className="w-9 hover:scale-105 duration-300 rounded-full"
                alt="Profile"/>
                <p className='dark:text-white text-lg font-medium'>{post.user}</p>
            </div>
        </Link>
        <div className="w-full relative overflow-hidden mt-2">
      
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
              className="w-full"
              style={{ flex: '0 0 auto' }}
            >
                <img
                  src={slide}
                  className="object-cover w-full h-full rounded-lg max-w-[500px]"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>

         
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

        <div className='flex space-x-2 dark:text-white'>
            <Link>
                <AiFillMessage className='mt-1 w-6 h-6 ' /> 
            </Link>
            <Link>
                <FaShareAlt className='mt-1 w-6 h-6 ' /> 
            </Link>
        </div>

        <div className="p-4 text-left">
          <p className="text-lg font-semibold dark:text-white">
            {post.title || 'Product Title'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 line-clamp-1">
            {post.description || 'Product description goes here...'}
          </p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
            <span className="text-dark dark:text-white">Price</span> : {formatPrice(post?.price)}
          </p>

          <Link to={`post/${post.slug}`} className='text-lg font-bold tracking-wide border-transparent border px-1.5 py-2 rounded-lg hover:scale-105 duration-500 hover:bg-white hover:text-gray-400 text-black bg-orange-400 text-gray-800 dark:bg-orange-300 dark:text-gray-800 dark:hover:text-black/40' >
            Purchase
          </Link>
        </div>
    </div>
  )
}

export default Post