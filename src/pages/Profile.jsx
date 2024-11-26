import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, ProfilePosts, RatingForm } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaThreads, FaTwitter } from "react-icons/fa6";
import { post } from '../assets';
import { getUserProfile } from '../actions/profileActions';
import ReactStars from "react-stars";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useParams();
    const [currentView, setCurrentView] = useState("posts")

    const getUserProfileReducer = useSelector((state) => state.getUserProfileReducer);
    const { loading, error, profile } = getUserProfileReducer;

    useEffect(() => {
        if (error) {
            if (error === "Given token not valid for any token type") {
                navigate('/');
            }
        } else if (username) {
            dispatch(getUserProfile(username));
        }
    }, [dispatch, error, navigate, username]);

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
    const renderReviews = () => {
        if (!profile?.reviews || profile.reviews.length === 0) {
            return <div className='dark:text-white text-lg'>No reviews available.</div>;
        }
        return profile.reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-dark p-4 rounded-md shadow mb-3">
                <div className="flex items-center mb-2">
                    <p className="font-medium text-lg dark:text-white">{review.rater}</p>
                    <ReactStars
                        count={5}
                        value={review.rating}
                        edit={false}
                        size={24}
                        color2={'#ffd700'}
                        half={true}
                    />
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Reviewed on {new Date(review.created_at).toLocaleDateString()}</p>
            </div>
        ));
    };
  return (
    <Layout>
        <div className='flex flex-col justify-center mx-5 md:mx-10'>
            {loading ? (
                <>
                    <div className='flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 mx-3 bg-white dark:bg-dark shadow max-w-6xl mx-auto rounded-lg'>
                    <div className='space-y-3'>
                        <div className='rounded-full w-[200px] h-[200px] animate-pulse bg-slate-300 dark:bg-slate-700'/>
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
                <div className="mt-6">
                    <h3 className="text-xl font-medium dark:text-white">User Reviews</h3>
                    {renderReviews()}
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-medium dark:text-white">Leave a Rating</h3>
                    <RatingForm profileId={profile.id} />
                </div>
        </div>
   </Layout>
  )
}
export default Profile