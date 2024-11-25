import React, { useEffect } from 'react'
import { Layout, Post } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { listAllPosts } from '../actions/postActions'
import {logout} from '../actions/userActions'


const Explore = () => {

    const dispatch = useDispatch()
    const listAllPostsReducer = useSelector((state)=> state.listAllPostsReducer)
    const { loading, error, posts } = listAllPostsReducer

    const { userInfo } = useSelector((state)=> state.userLoginReducer)

    useEffect(()=> {
        if (!userInfo) {
            dispatch(logout())
        } else {
            dispatch(listAllPosts())
        }
    }, [dispatch, userInfo])
  return (
    <Layout>
        {loading ? (
            <div className='flex flex-col justify-center items-center'>
                <div className='flex space-x-2 justify-start pt-10'>
                    <div className='bg-slate-300 dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                    <div className='bg-slate-300 dark:bg-slate-800 h-3 w-1/4 rounded-lg animate-pulse'/>
                </div>
                <div className='bg-slate-300 dark:bg-slate-800 animate-pulse h-[600px] w-[500px] rounded-lg animate-pulse mt-2'/>
                <div className='flex space-x-2 justify-start mt-3'>
                    <div className='bg-white dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                    <div className='bg-slate-300 dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                    <div className='bg-slate-300 dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                </div>
                <div className='bg-slate-300 dark:bg-slate-800 h-3 w-1/4 rounded-lg animate-pulse mt-2'/>
                <div className='bg-slate-300 dark:bg-slate-800 h-4 w-1/3 rounded-lg animate-pulse mt-2'/>
                <div className='bg-slate-300 dark:bg-slate-800 h-3 w-1/4 rounded-lg animate-pulse mt-2'/>

                <div className='flex space-x-2 justify-start pt-10'>
                    <div className='bg-slate-300 dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                    <div className='bg-slate-300 dark:bg-slate-800 h-3 w-1/4 rounded-lg animate-pulse'/>
                </div>
                <div className='bg-slate-300 dark:bg-slate-800 animate-pulse h-[500px] w-[500px] rounded-t-lg animate-pulse mt-2'/>
                <div className='flex space-x-2 justify-start mt-3'>
                    <div className='bg-slate-300 dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                    <div className='bg-slate-300 dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                    <div className='bg-slate-300 dark:bg-slate-800 rounded-full h-7 w-7 animate-pulse'/>
                </div>
                <div className='bg-slate-300 dark:bg-slate-800 h-3 w-1/4 rounded-lg animate-pulse mt-2'/>
                <div className='bg-slate-300 dark:bg-slate-800 h-4 w-1/3 rounded-lg animate-pulse mt-2'/>
                <div className='bg-slate-300 dark:bg-slate-800 h-3 w-1/4 rounded-lg animate-pulse mt-2'/>
            </div>
        ) : error ? (
            <div className='bg-red-500 p-1.5 h-9 text-white rounded-md'>{error}</div>
        ) : (
            <div className='flex flex-col items-center justify-center pt-10 space-y-5'>
                {posts && posts.map((post)=> (
                    <div key={post.id}>
                        <Post post={post}/>
                    </div>
                ))}
            </div>
        )}
    </Layout>
  )
}

export default Explore