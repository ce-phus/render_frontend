import React, { useEffect } from 'react';
import { tractor, tractor1, tractor2, dashboard } from '../assets';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux"
import { ProductIndex, Banner, Footer } from "../components"
import { getPostIndexList } from '../actions/postActions';

import AOS from "aos";
import "aos/dist/aos.css";

const BannerData = {
  discount: "30% OFF",
  title: "Seller Dashboard Insights",
  date: "10 Jan to 28 Jan",
  image: dashboard, 
  title2: "Track Your Sales Performance",
  title3: "Manage Your Listings Effectively",
  title4: "Monitor your progress, analyze sales data, and optimize your listings for better visibility and sales.",
  bgColor: "#f42c37",
};

const HeroData = [
  {
    id: 1,
    img: tractor,
    title: "Buy or Rent",
    title2: "Tractors",
    subtitle: "All In One",
  },
  {
    id: 2,
    img: tractor2,
    title: "Connect With",
    title2: "Buyers",
    subtitle: "All In One",
  },
  {
    id: 3,
    img: tractor1,
    title: "Buy or Rent",
    title2: "Agri-Implements",
    subtitle: "All In One",
  },
];

const Home = () => {

  React.useEffect(() => {
    AOS.init({
      duration :800,
      easing: 'ease-in-sine',
      delay:100,
      offset: 100
    })
    AOS.refresh()
  }, [])
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const dispatch = useDispatch()

  const postIndexReducer = useSelector((state)=> state.postIndexReducer)
  const { loading, error,  featuredPosts} = postIndexReducer
  const { loading:PopularPostsLoading, error:PopularPostsError,  popularPosts} = postIndexReducer

  useEffect(()=> {
    dispatch(getPostIndexList())
  }, [dispatch])
  

  return (
    <div className='w-[400px] md:w-full'>
      <div className="pb-8 sm:pb-0 flex items-center flex-col overflow-hidden">
        <Slider {...sliderSettings} className="w-full max-w-screen-lg">
          {HeroData.map((data) => (
            <div key={data.id} className="flex justify-center items-center p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-screen-md gap-x-12">
                {/* Text Section */}
                <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-300">{data.subtitle}</h1>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-500">{data.title}</h1>
                  <h1 className="text-5xl uppercase text-orange-300 sm:text-[80px] font-bold tracking-wide dark:text-orange/5">{data.title2}</h1>
                </div>

                {/* Image Section */}
                <div className="flex justify-center items-center order-1 sm:order-2">
                  <img
                    src={data.img}
                    alt={data.title2}
                    className="w-full max-w-[300px] sm:max-w-[450px] h-auto object-contain mx-auto drop-shadow-lg" 
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className='pt-10 '>
          <h1 className='text-3xl font-bold tracking-wide text-accent flex items-center justify-center'>Featured Posts</h1>
          <div className='mt-5'>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>

                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>

                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>

                
                
              </div>
            ): error ? (
              <div className='bg-red-500 text-white rounded-md p-2'>{error}</div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {featuredPosts && featuredPosts.map((post)=> (
                  <div key={post.id} className='flex flex-col'>
                    <ProductIndex post={post}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Banner data = {BannerData}/>

        <div className='mt-10'>
            <h1 className='text-3xl flex justify-center items-center text-accent font-bold'>Popular Posts</h1>
            <div className='mt-5'>
              {PopularPostsLoading ? (
                <div className='grid grid-cols-1 md:gr-d-cols-3 lg:grid-cols-4 gap-2'>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700  animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>
                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>

                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>

                <div className='mt-2'>
                  <div className='bg-slate-300 dark:bg-slate-700 rounded-lg h-[200px] w-[400px] animate-pulse'/>
                  <div className='mt-3 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/2 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                  <div className='mt-2 h-3 rounded-md w-1/4 bg-slate-300 dark:bg-slate-700 animate-pulse'/>
                </div>

                
                
              </div>
              ) : PopularPostsError ? (
                <div className='bg-red-500 text-white rounded-md p-2'>{PopularPostsError}</div>
              ): (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                  {popularPosts && popularPosts.map((post)=> (
                    <div key={post.id} className='flex flex-col'>
                      <ProductIndex post={post} />
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>
        
        <Footer/>
      </div>
    
  );
};

export default Home;
