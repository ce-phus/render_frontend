import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostDetails } from '../actions/postActions'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { FaCarTunnel } from 'react-icons/fa6'
import { BsCart } from 'react-icons/bs'
import { getProfile } from '../actions/profileActions'
import { addToCart } from '../actions/cartActions'
const PostDetail = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();

    const [message, setMessage] = useState('');

    const { loading, error, post } = useSelector((state) => state.postDetailsReducer);
    const { profile } = useSelector((state) => state.getProfileReducer);


    useEffect(() => {
        if (slug) {
            dispatch(getPostDetails(slug));
            dispatch(getProfile())
        }
    }, [dispatch, slug]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const photos = post?.photos || [];

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

    const handleAddToCart = (postId) => {
        if (profile.username === post.user) {
          setMessage("You cannot add your own product to the cart");
        } else {
          dispatch(addToCart(postId, 1, false));
          setMessage("Item added to cart");
        }
      };
    
      // Handle message timeout
      useEffect(() => {
        if (message) {
          const timer = setTimeout(() => {
            setMessage("");
          }, 4000);
          return () => clearTimeout(timer); // Cleanup timer
        }
      }, [message]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'kes' }).format(price);
    };

    return (
        <Layout>
            {loading ? (
                <div className='flex flex-col items-center justify-center'>
                <div className='flex space-x-2 justify-start pt-10'>
                        <div className='bg-white dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                        <div className='bg-white dark:bg-slate-800 h-3 w-1/4 rounded-lg animate-pulse'/>
                </div>
                <div className='flex flex-col md:flex-row space-x-5 space-y-5 mt-2'>
                    <div className='bg-slate-300 dark:bg-slate-800 animate-pulse h-[600px] w-[500px] rounded-lg animate-pulse mt-2'/>
                    <div>
                    <div className='bg-white dark:bg-slate-800 h-3 w-1/2 rounded-lg animate-pulse mt-2'/>
                    <div className='bg-white dark:bg-slate-800 h-4 w-1/4 rounded-lg animate-pulse mt-2'/>
                    <hr className='my-5 border- h-px rounded-full border-gray-300 dark:border-gray-500'/>
                    <div className='bg-white dark:bg-slate-800 h-3 w-1/2 rounded-lg animate-pulse mt-2'/>
                    <div className='bg-white dark:bg-slate-800 h-4 w-1/4 rounded-lg animate-pulse mt-2'/>
                    <div className='bg-white dark:bg-slate-800 h-3 w-1/2 rounded-lg animate-pulse mt-2'/>
                    <div className='bg-white dark:bg-slate-800 h-4 w-1/4 rounded-lg animate-pulse mt-2'/>
                    </div>
                </div>
            </div>
            ) : error ? (
                <div className='bg-red-500 p-1.5 text-white rounded-lg'>{error}</div>
            ) : (
                <>
                    <div className='flex flex-col md:flex-row space-y-5 dark:bg-dark items-center justify-center mx-5'>
                        <div className='flex flex-col'>
                            <Link>
                                <div className='flex justify-start space-x-2'>
                                    <img
                                        src={fullProfileImageUrl}
                                        className="w-9 hover:scale-105 duration-300 rounded-full"
                                        alt="Profile"
                                    />
                                    <p className='dark:text-white text-lg font-medium'>{post.user}</p>
                                </div>
                            </Link>
                            <div className='flex flex-col md:flex-row space-x-5 space-y-5'>
                                <div className="w-full relative overflow-hidden mt-2 md:w-[600px]">
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
                                        className="w-full max-h-[600px] "
                                        style={{ flex: '0 0 auto' }}
                                        >
                                            <img
                                            src={slide}
                                            className="object-cover w-full h-full rounded-lg max-w-[600px]"
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

                                    <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                                        {slides.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-400'}`}
                                                onClick={() => setCurrentSlide(index)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='flex flex-col overflow-y-auto h-4/5 max-w-3xl mx-auto'>
                                    <h3 className='text-3xl dark:text-white tracking-wide text-secondary uppercase mb-3'>{post.title}</h3>
                                    <h2 className='text-3xl font-bold mb-3 dark:text-white'>{formatPrice(post?.price)}</h2>

                                    <hr className='my-5 border- h-px rounded-full border-gray-300 dark:border-gray-500' />

                                    <h2 className='text-xl font-medium dark:text-white'>Detailed Description</h2>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm mx-1 tracking-wide mb-2'>{post.description}</p>
                                    <div className='grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3'>
                                        <div>
                                            <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                                                <span className='text-dark dark:text-white'>Country</span> : {post?.country}
                                            </p>
                                            <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                                                <span className='text-dark dark:text-white'>City</span> : {post?.city}
                                            </p>
                                            <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                                                <span className='text-dark dark:text-white'>Postal Code</span> : {post?.postal_code}
                                            </p>
                                            <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                                                <span className='text-dark dark:text-white'>Street Address</span> : {post?.street_address}
                                            </p>
                                        </div>
                                        <div>
                                            <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                                                <span className='text-dark dark:text-white'>Price</span> : {formatPrice(post?.price)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>
                                                <span className='text-dark dark:text-white'>Advert Type</span> : {post?.advert_type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mt-1 mb-3 mx-3 flex space-x-5'>
                                    <button
                                        onClick={() => handleAddToCart(post.id)}
                                        className="text-lg font-medium text-white dark:text-white bg-orange-500 p-1.5 rounded-md flex"
                                    >
                                            
                                            {message ? (
                                                <div className='bg-red-500 text-white p-1.5 rounded-md'>
                                                    {message}
                                                </div>
                                            ) :  'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};

export default PostDetail;
