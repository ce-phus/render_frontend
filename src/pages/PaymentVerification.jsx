import React, { useEffect } from 'react'
import { verifyPayment } from '../actions/paymentActions'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { clearCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../components'

const PaymentVerification = () => {
    const { ref } = useParams()
    const dispatch = useDispatch()

    const { loading, error, verificationData } = useSelector((state) => state.verifyPaymentReducer);
    

    useEffect(()=>{
        if (ref) {
            dispatch(verifyPayment(ref))
        }
    }, [dispatch, ref])

    useEffect(() => {
        if (verificationData && verificationData.payment.payment_status === 'Verified') {
            dispatch(clearCart());  
        }
    }, [dispatch, verificationData]);
  return (
    <Layout>
         <div className='container mx-auto pt-10 dark:text-white dark:bg-dark'>
        {loading ? (
            <Spinner />
        ) : error ? (
            <div>
                {error || "An error occurred."}
            </div>
            
        ) : verificationData ? (
            <div className="text-center">
                <h2 className='text-4xl font-bold'>Payment Verification</h2>
                <h4 className='text-lg font-medium'>
                    Order #{verificationData.placed_order.id} - {verificationData.payment.payment_status}
                </h4>
                {verificationData.payment.payment_status === 'Verified' ? (
                <p className='text-xl font-medium'>Your payment of KES {verificationData.payment.amount} was successful!</p>
                ) : (
                <p>Payment verification failed. Please contact support.</p>
                )}
            </div>
        ) : null}
    </div>
    </Layout>
   
  )
}

export default PaymentVerification