import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Spinner } from '../components'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link, useNavigate } from 'react-router-dom'
import { initiatePayment } from '../actions/paymentActions';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isDevelopment = import.meta.env.MODE ==='development'
    const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY

    const cartReducer = useSelector((state) => state.cartReducer);
    const { cartItems, loading, error } = cartReducer;
    
    const paymentReducer = useSelector((state) => state.initiatePaymentReducer);
    const { paymentData, loading: paymentLoading, error: paymentError } = paymentReducer;
    console.log("Payment Error: ", paymentError)

    const { profile } = useSelector((state)=> state.getProfileReducer)
    const { userInfo } = useSelector((state)=>state.userLoginReducer)

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    const increaseQuantity = (item) => {
        dispatch(addToCart(item.id, item.quantity + 1, true));
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(addToCart(item.id, item.quantity - 1, true));
        }
    };

    const handleRemoveItem = (postId) => {
        dispatch(removeFromCart(postId));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item?.price * item?.quantity, 0);
    };

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCheckout = () => {
        const orderData = {
            items:cartItems.map(item=> ({
                id:item.id,
                title:item.title,
                price:item.price,
                quantity: item.quantity,
                cover_photo: item.cover_photo,
                url:item.slug
            })),
            total_cost: calculateTotalPrice(),
            total_quantity: calculateTotalQuantity(),
            first_name: profile.first_name || firstName,
            last_name: profile.last_name || lastName,
            email: profile.email || email,
            country: profile.country || country,
            city: profile.city || city,
            phone_number: profile.phone_number || phone_number
        }
        console.log("Order Data: ", orderData);
        dispatch(initiatePayment({ "order":orderData }))
        navigate('/checkout');
    }
    function numberWithCommas(x) {
        if (x === undefined || x === null) return "0"; 
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  return (
    <Layout>
        <div className='max-w-7xl mx-auto pt-10 pb-64 mb-64 dark:text-white mx-10 md:mx-0'>
            <h1 className='text-4xl font-bold mb-3 mx-10'>Your Cart</h1>
            {loading ? (
                <div></div>
            ) : error ? (
                <div className='bg-red-600 text-white p-1.5 rounded-lg'>
                    {error || "An error occurred while deleting."}
                </div>
            ) :
                cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className='text-3xl font-medium mb-3'>Cart is empty</p>
                        <Link to="/" className="text-lg text-white font-medium px-1.5 py-1.5 rounded-lg bg-orange-600">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left rtl:text-right rounded-lg'>
                            <thead className='text-xl text-primary uppercase bg-gray-100 dark:bg-secondary rounded-lg dark:text-white shadow-md'>
                                <tr>
                                    <th className='py-3 px-6'>Image</th>
                                    <th className='py-3 px-6'>Product</th>
                                    <th className='py-3 px-6'>Price</th>
                                    <th className='py-3 px-6'>Quantity</th>
                                    <th className='py-3 px-6'>Total</th>
                                    <th className='py-3 px-6'>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item) => {
                                console.log("Item: ",item);
                                return(
                                    <tr key={item?.id}>
                                    <td className='py-3 px-6'>
                                        <img
                                            src={`${API_URL}${item?.cover_photo}`}
                                            alt={item?.title}
                                            className='w-12 h-12 object-cover'
                                        />
                                    </td>
                                    <td className='py-3 px-6 text-lg font-medium'>{item?.title}</td>
                                    <td className='py-3 px-6 text-lg font-medium'>KES {numberWithCommas(item?.price)}</td>
                                    <td className='py-3 px-6 text-lg font-medium'>
                                        <button className='bg-gray-300 text-white px-1.5 rounded-full' onClick={() => decreaseQuantity(item)}>-</button>
                                        <span className='mx-2'>{item?.quantity}</span>
                                        <button className='bg-blue-600 text-white px-1.5 rounded-full' onClick={() => increaseQuantity(item)}>+</button>
                                    </td>
                                    <td className='py-3 px-6 text-lg font-medium'>KES {numberWithCommas(item?.price * item?.quantity)}</td>
                                    <td className='py-3 px-6'>
                                        <button
                                            onClick={() => handleRemoveItem(item?.id)}
                                            className='bg-red-500 px-1.5 py-1 rounded-lg text-white hover:bg-red-400'
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                                )
                                
                            })}
                        </tbody>
                        </table>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 pb-20 mb-10'>
                        <div className='cols-span-2'>
                            <div className='flex items-center justify-between p-4 rounded-lg w-1/2 md:w-full'>
                                <input type='text' placeholder='Coupon code'
                                className='py-4 px-2 border rounded-l-lg flex-grow border-gray-400 shadow-md dark:bg-dark dark:text-white'/>
                                <button className='md:px-5 px-1 py-4 md:py-4 bg-dark dark:bg-white dark:text-dark text-white rounded-r-md hover:bg-dark/55 '>Apply Coupon Code</button>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-2xl font-bold tracking-wide uppercase'>Cart Totals</h2>
                            <hr className='border-0 h-px bg-gray-300 rounded-full my-3'/>
                            <div className='flex flex-col mb-2'>
                                <div className='flex mb-5'>
                                    <p className='text-dark mr-12 text-lg font-normal'>Subtotal</p>
                                    <strong className='text-lg'>KES {numberWithCommas(calculateTotalPrice())}</strong>
                                </div>
                                <div className='mt-5 mx-3  md:w-full w-1/2'>
                                    <form onSubmit={handleCheckout}>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>First Name</label>
                                            <input className='bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-800 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='first name'
                                            placeholder={profile?.first_name}
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Last Name</label>
                                            <input className='bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-800 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='first name'
                                            placeholder={profile?.last_name}
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Email</label>
                                            <input className='bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-800 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='email'
                                            placeholder={profile?.email}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Country</label>
                                            <input className='bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-800 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='country'
                                            placeholder={profile?.country|| 'N/A'}
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Phone Number</label>
                                            <input className='bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-800 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='phonenmber'
                                            placeholder={profile?.phone_number || 'N/A'}
                                            value={phone_number}
                                            onChange={(e) => setPhone(e.target.value)}/>
                                        </div>
                                        
                                        <button type='submit' className='py-4 px-4 rounded-lg bg-dark dark:bg-white dark:text-dark font-medium text-white text-lg shadow-md hover:bg-primary/70 disabled:bg-gray-400' >
                                            {paymentLoading ? <Spinner/> : 'Proceed to Checkout'}
                                        </button>
                                    </form>
                                   
                               
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                )}
        </div>
    </Layout>
  )
}

export default Cart