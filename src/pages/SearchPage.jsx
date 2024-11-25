import React, { useEffect } from 'react'
import { Layout, Post } from '../components'
import { useLocation } from 'react-router-dom'
import { searchPost } from '../actions/postActions'
import { useDispatch, useSelector } from 'react-redux'

const SearchPage = () => {
    const dispatch= useDispatch();
    const { search } = useLocation();
    const query = new URLSearchParams(search).get('query')

    const searchPostReducer = useSelector((state)=> state.searchPostReducer)
    const { loading, posts, error } = searchPostReducer;

    useEffect(()=> {
        if (query) {
            dispatch(searchPost({catch_phrase:query}))
        }
    }, [dispatch, query])
  return (
    <Layout>
        <div className='flex flex-col items-center mt-10'>
            <h1 className='text-2xl font-bold dark:text-white'>"{query}" Results</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className='grid-cols-1 md:grid-cols-3 gap-6'>
                {posts?.map((post)=>(
                    <div key={post.id}>
                        <Post post={post}/>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default SearchPage