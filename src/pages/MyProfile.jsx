import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, ProfilePosts } from '../components';
import { Link } from 'react-router-dom';
import { getProfile } from '../actions/profileActions';
import { FaFacebook, FaInstagram, FaThreads, FaTwitter } from "react-icons/fa6";
import { post } from '../assets';

const MyProfile = () => {
    const dispatch = useDispatch();
    const [currentView, setCurrentView] = useState("posts")

    const getProfileReducer = useSelector((state) => state.getProfileReducer);
    const { loading, error, profile } = getProfileReducer;

    useEffect(()=> {
        dispatch(getProfile())
    }, [dispatch])

    const renderPosts = () => {
        if (!profile.posts || profile.posts.length === 0) {
            return <div className='dark:text-white text-2xl font-bold'>No Posts available</div>
        }
        return (
            <div className='pb-20 mb-64 max-w-8xl grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                {profile?.posts && profile?.posts.map((posts)=> (
                    <div key={posts.id}>
                        <ProfilePosts posts={posts}/>
                    </div>
                )) }
            </div>
        )
    }
  return (
   <Layout>
    <div className='flex flex-col justify-center md:mx-10 '>
                {loading ? (
                    <>
                    <div className='flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 mx-3 bg-white dark:bg-dark shadow max-w-6xl mx-auto rounded-lg'>
                    <div className='space-y-3'>
                        <div className='rounded-full w-[200px] h-[200px] animate-pulse bg-slate-300 dark:bg-slate-800'/>
                            <div className='flex space-x-2'>
                                <div className='rounded-lg w-10 h-10 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                                <div className='rounded-lg w-10 h-10 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                                <div className='rounded-lg w-10 h-10 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                                <div className='rounded-lg w-10 h-10 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                            </div>
                    </div>
                    <div className='space-y-3'>
                        <div className='flex space-x-2'>
                            <div className='h-3 w-1/4 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                            <div className='h-7 w-[100px] rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                        </div>
                        <div className='h-3 w-1/2 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                        <div className='h-3 w-1/4 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse'/>                    
                        <div className='h-3 w-1/4 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse'/>                    
                        <div className='h-3 w-1/4 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse'/>                    
                        <div className='h-3 w-1/4 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse'/>                    
                    </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  mt-5'>
                        <div className='w-[500px] h-[300px] bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                        <div className='w-[500px] h-[300px] bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                        <div className='w-[500px] h-[300px] bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                        <div className='w-[500px] h-[300px] bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                        <div className='w-[500px] h-[300px] bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                        <div className='w-[500px] h-[300px] bg-slate-300 dark:bg-slate-800 animate-pulse'/>
                    </div>
                </>
                ) : error}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 bg-transparent dark:bg-dark shadow max-w-5xl mx-auto rounded-lg pb-20'>
                    <div className='space-y-3'>
                        <img src={profile?.profile_photo} alt="Profile"
                        className="rounded-full h-48 w-48 object-cover mx-auto " />
                        <div className='flex space-x-2 justify-center'>
                        <a href={profile?.facebook_url} target='_blank' className='mb-2 font-medium text-lg hover:text-violet-800 hover:scale-105 hover:duration-200 flex'>
                            <FaFacebook className='mt-1.5 mr-2 dark:text-white dark:hover:text-yellow-900 hover:text-yellow-900'/> 
                            </a>
                            <a href={profile?.twitter_url} target='_blank' className='mb-2 font-medium text-lg hover:text-violet-800 hover:scale-105 hover:duration-200 flex'>
                            <FaTwitter className='mt-1.5 mr-2 dark:text-white dark:hover:text-yellow-900 hover:text-yellow-900'/> 
                            </a>
                            <a href={profile?.instagram_url} target='_blank' className='mb-2 font-medium text-lg hover:text-violet-800 hover:scale-105 hover:duration-200 flex'>
                            <FaInstagram className='mt-1.5 mr-2 dark:text-white dark:hover:text-yellow-900 hover:text-yellow-900'/> 
                                
                            </a>
                            <a href={profile?.threads_url} target='_blank' className='mb-2 font-medium text-lg hover:text-violet-800 hover:scale-105 hover:duration-200 flex'>
                            <FaThreads className='mt-1.5 mr-2 dark:text-white dark:hover:text-yellow-900 hover:text-yellow-900'/> 
                            
                        </a>
                        </div>
                    </div>
                    <div className='dark:text-white mt-5 mx-3'>
                            <Link to={`/profile/edit`} className='mb-3'>
                                <button className='font-medium tracking-wide bg-gray-200 w-1/2 py-1.5 rounded-lg hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                    Edit Profile
                                </button>
                            </Link>
                        <div className='mb-3 mt-4'>
                            <div className='flex gap-4'>
                                <p className='font-medium text-xl'><span className='ml-3'>{profile?.full_name}</span></p>
                                <span className='ml-3 text-lg text-white font-medium bg-black px-1.5 py-1.5 rounded-lg dark:bg-white dark:text-black'>
                                    {profile?.is_buyer ? 'Buyer' : profile?.is_seller ? 'Seller' : profile?.is_agent ? ' Agent' : ''}
                                </span>
                            </div>
                            <div className='mt-3'>
                                <p className='text-gray-400 text-lg mb-3 font-medium'>{profile?.about_me}</p>
                                <p className='mb-2 font-medium text-lg'>Gender: {profile?.gender}</p>
                                <p className='mb-2 font-medium text-lg'>Country: {profile?.country}</p>
                                <p className='mb-2 font-medium text-lg'>City: {profile?.city}</p>
                                <p className='mb-2 font-medium text-lg'>Reviews: {profile?.num_reviews}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-center space-x-8 mt-5 mx-2'>
                    <Link
                    onClick={() => setCurrentView('posts')}
                    className='flex items-center'>
                        <img
                        src={post}
                        className='w-6 h-6'/>
                        <h1 className='text-xl font-medium dark:text-white ml-2'>Posts</h1>
                    </Link>
                    
                </div>
                <div className='mt-4'>
                    {currentView === 'posts' ? renderPosts(): '' }
                </div>
                
            </div>
   </Layout>
  )
}

export default MyProfile