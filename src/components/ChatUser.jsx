import React from 'react'
import { useDispatch } from 'react-redux';
import { setActiveChat } from '../actions/websocketActions';

const ChatUser = ({ user }) => {
  const dispatch = useDispatch();

  const handleUserClick = () => {
    dispatch(setActiveChat(user));
  };
  const isDevelopment = import.meta.env.MODE ==='development'
  const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY
  const fullProfileImageUrl = API_URL + user.profile.profile_photo;
console.log("User profile photo: ", user.profile.profile_photo)
  return (
    <div className='flex items-center mb-4 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md cursor-pointer'
    onClick={handleUserClick}>
      <div className='w-12 h-12 bg-yellow-700 rounded-full mr-3'>
        <img
        src={fullProfileImageUrl}
        alt='profile image'
        className='w-12 h-12 rounded-full'/>
      </div>
      <div className='flex-1'>
        <h2 className='text-gray-700 font-medium dark:text-gray-300'>{user.profile.full_name}</h2>
        <p className='text-sm font-medium dark:text-white'>Hello</p>
      </div>
    </div>
  )
}

export default ChatUser