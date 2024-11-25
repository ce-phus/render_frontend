import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { AiFillMessage } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react'
import { createPostComment } from '../actions/commentActions';
import { listPostComments } from '../actions/commentActions';
import { useDispatch } from 'react-redux';
import CommentPost from './CommentPost';
import { motion } from 'framer-motion';
import { close } from '../assets';

const Post = ({ post }) => {
  const dispatch = useDispatch()
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ commentData, setComment ] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const photos = post.photos || [];

  const { profile } = useSelector((state) => state.getProfileReducer);

  const isDevelopment = import.meta.env.MODE ==='development'
  const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY
  const fullImageUrl = API_URL + post.cover_photo;
  const fullProfileImageUrl = API_URL + post.profile_photo;

  const postCommentCreateReducer = useSelector((state)=> state.postCommentCreateReducer)
  const  {  loading:createCommentLoading, error:createCommentError, comment } = postCommentCreateReducer

  const postCommentListReducer = useSelector((state)=> state.postCommentListReducer)
    const { loading:commentlistLoading, error:commentListError, comments } = postCommentListReducer

  const slides = [fullImageUrl, ...photos.map((photo) => API_URL + photo.photo)];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post?.id) {
        dispatch(createPostComment(post.id, commentData));
        window.alert("Comment posted!!");
        // window.location.reload(); 
    } else {
        console.error("Post ID is missing");
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleNext = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const formatPrice = (price) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'kes' }).format(price);
  };

  useEffect(() => {
    if (post?.id) {
        dispatch(listPostComments(post.id));
    }
}, [dispatch, post?.id]);

  return (
    <>
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
            <button onClick={togglePopup}>
                <AiFillMessage className='mt-1 w-6 h-6 ' /> 
            </button>
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

{isPopupOpen && (
  <motion.div initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 0.9, opacity: 2 }} 
      className='z-50 mx-auto pt-20 fixed inset-0 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 bg-white/75 dark:bg-dark/85 rounded-lg backdrop-blur-md py-32'>
      <div className='absolute top-0 right-0' onClick={togglePopup}>
          <img src={close} className='dark:text-white cursor-pointer'/>
      </div>
      <div className='bg-white dark:bg-dark p-4 rounded-lg shadow-lg max-w-3xl w-full transition duration-150 ease-in-out'>
          <h2 className='text-xl font-bold mb-4 dark:text-white tracking-wide'>{post?.user}</h2>
          <hr className='h-px my-3 w-full dark:border-gray-600'/>
          <div className='mb-4'>
              <div className='h-[800px] overflow-y-auto'>
                  {commentlistLoading ? (
                      <div className='flex flex-col space-y-4'>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                          <div className='flex space-x-2'>
                              <div className='bg-slate-300 rounded-full h-9 w-9 dark:bg-slate-700 animate-pulse'/>
                              <div className='w-1/4 h-3 bg-slate-300 rounded-lg dark:bg-slate-700 animate-pulse'/>
                          </div>
                      </div>
                  ) : commentListError ? (
                      <div>{commentListError}</div>
                  ) : 
                      <div className='flex flex-col space-x-3'>
                          {comments && comments.map((comment)=> (
                             <div key={comment.id} className=''>
                              <CommentPost comment={comment}/>
                             </div> 
                          ))}
                      </div>}
              </div>
              <div className='mt-5'>
                  <hr className='h-px my-3 w-full dark:border-gray-600'/>
                  <form className='flex space-x-3'
                  onSubmit={handleSubmit}>
                      <button type="button" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
                          <MdOutlineEmojiEmotions className="w-7 h-7 dark:text-white"/>
                      </button>
                      {isEmojiPickerOpen && (
                          <EmojiPicker onEmojiClick={handleEmojiClick} />
                      )}
                      <input
                          className='w-full bg-gray-50 border px-2 py-2 rounded-lg text-dark dark:text-white dark:bg-dark focus:ring-white'
                          placeholder='Add a comment...'
                          value={commentData}
                          onChange={(e) => setComment(e.target.value)}
                      />
                      <button type="submit" className='mt-2 text-lg text-yellow-500 font-medium'>Post</button>
                  </form>
              </div>
          </div>
      </div>
  </motion.div>
)}
    </>
    
  )
}

export default Post