import React from 'react'
import { cart } from '../assets'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Cart = () => {
    const cartReducer = useSelector((state)=>state.cartReducer)
    const { cartItems } = cartReducer
    console.log("Cart Items Reducer State: ", cartItems)
  return (
    <Link to={'/cart'}>
        <div className='mx-3 relative'>
            <img
            src={cart}
            className='h-12 w-12'/>

            {Array.isArray(cartItems) && cartItems.length > 0 && (
            <span className='absolute -top-1 -right-2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full'>
            {cartItems.length}
            </span> )}
        </div>
    </Link>
  )
}

export default Cart