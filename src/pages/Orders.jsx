import React, { useEffect } from 'react'
import { Layout } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import logout from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../actions/orderActions'
import Login from './Login'

const Orders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLoginReducer = useSelector((state)=> state.userLoginReducer)
    const {userInfo} = userLoginReducer

    const getAllOrdersReducer = useSelector((state)=> state.getAllOrdersReducer)
    const {orders, loading, error} = getAllOrdersReducer
    console.log("Orders: ", orders)

    useEffect(()=>{
        dispatch(getOrders())
    }, [dispatch])

    const handlelogout = () => {
        dispatch(logout());
        navigate('/')
    }

    if (!userInfo?.access) {
        return (
            <Login />
        )
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'kes' }).format(price);
    };
  return (
    <Layout>
        <div className='mt-10 mx-3'>
            <h1 className='text-3xl font-bold tracking-wide dark:text-white'>ORDERS</h1>
            <div className='flex flex-col mt-5'>
                {loading ? (
                    <div>Loading</div>
                ) : error ? 
            (<div className='bg-red-500 p-1.5 rounded-lg text-white'>{error}</div>
            ) : (
                <div>
                    {orders && orders.length > 0 ?(
                        <div>
                            {orders.map((order)=> (
                                <div key={orders.id}>
                                <div className='bg-gray-100 p-4 flex justify-between items-center dark:bg-gray-700 rounded-lg mx-5'>
                                    <p className='dark:text-white'><strong>Date:{new Date(order.created_at).toLocaleDateString()}</strong></p>
                                    <p className='dark:text-white'><strong>Status: {order.status}</strong></p>
                                </div>
                                <div className='p-4'>
                                    <table className='min-w-full divide-y divide-gray-400 dark:divide-gray-800 dark:text-white'>
                                        <thead>
                                            <tr>
                                                <th className='px-4 py-2 '>Title</th>
                                                <th className='px-4 py-2'>Quantity</th>
                                                <th className='px-4 py-2'>Price</th>
                                                <th className='px-4 py-2'>Reference Code</th>
                                                <th className='px-4 py-2'>Street Address</th>
                                                <th className='px-4 py-2'>Country</th>
                                                <th className='px-4 py-2'>City</th>
                                                <th className='px-4 py-2'>Postal Code</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white dark:bg-dark divide-gray-200 dark:divide-gray-600 dark:text-white'>
                                            {order.items.map((item)=>(
                                                <tr key={item.id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                                  <td className='px-4 py-2 font-medium'>{item.post.title || 'No Title Available'}</td>
                                                    <td className='px-4 py-2 font-medium'>{item.quantity}</td>
                                                    <td className='px-4 py-2 font-medium'>{formatPrice(item.price)}</td>  
                                                    <td className='px-4 py-2 font-medium'>{item.post.ref_code}</td>  
                                                    <td className='px-4 py-2 font-medium'>{item.post.street_address}</td>  
                                                    <td className='px-4 py-2 font-medium'>{item.post.country}</td>  
                                                    <td className='px-4 py-2 font-medium'>{item.post.city}</td>  
                                                    <td className='px-4 py-2 font-medium'>{item.post.postal_code}</td>  
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className='bg-gray-100 dark:bg-gray-800 dark:text-white'>
                                        <tr>
                                                <td className='px-4 py-2 text-lg font-medium'>Subtotal:</td>
                                                <td className='px-4 py-2 font-medium'>{order.total_quantity}</td>
                                                <td className='px-4 py-2 font-medium'>{order.paid_amount  || "Not paid"}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            ))}
                        </div>
                        
                    ): (
                        <p className='text-2xl dark:text-white mt-5'>No orders made....</p>
                    )}
                </div>
            )}
            </div>
        </div>
    </Layout>
  )
}

export default Orders