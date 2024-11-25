import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components'
import {Spinner} from '../components'

const Checkout = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const paymentReducer = useSelector((state) => state.initiatePaymentReducer);
    const { paymentData, loading, error } = paymentReducer;
    console.log("Payment data: ", paymentData)
    const userLogin = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLogin;

    const { profile } = useSelector((state)=>state.getProfileReducer)

    const cartReducer = useSelector((state) => state.cartReducer);
    const { cartItems } = cartReducer;

    const getAllOrdersReducer = useSelector((state)=> state.getAllOrdersReducer)
    const {orders, loading:loadingOrders, error:errorOrders} = getAllOrdersReducer
    const currentOrder = orders && orders.length > 0 ? orders : null;

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      };

    function numberWithCommas(x) {
        if (x === undefined || x === null) return "0"; 
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      const payWithPaystack = () => {
        const currency = 'KES'
        const ref = paymentData.payment.ref;
        const amount = paymentData.payment.amount * 100;
        const pubKey = paymentData.paystack_pub_key
    
        const handler = window.PaystackPop.setup({
          key: pubKey,
          email:paymentData.payment.email,
          amount: amount,
          ref: ref,
          currency: currency.toUpperCase(),
          callback: function (response) {
            history(`/verify-payment/${ref}`);
          },
          onClose: function () {
            alert('Payment window closed. Please complete the payment to proceed')
          },
        });
        handler.openIframe()
      }

      useEffect(() => {
        const loadPaystackScript = () => {
          if (!window.PaystackPop) {
            const script = document.createElement('script');
            script.src = 'https://js.paystack.co/v1/inline.js';
            script.async = true;
            script.onload = () => {
              console.log('Paystack script loaded successfully.');
            };
            script.onerror = () => {
              console.error('Failed to load Paystack script.');
            };
            document.body.appendChild(script);
          }
        };
    
        loadPaystackScript();
      }, []);
  return (
    <Layout>
         <div className="container mx-auto pt-20">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center pt-5">
            {loading && <Spinner />}
            {error && <div variant="danger">{error}</div>}
            {  (
              <>
                <span className="display-3 thankyou-icon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart-check mb-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                  </svg>
                </span>
                <h2 className="text-3xl font-medium text-black dark:text-white">Hello {profile?.username}</h2>
                <p className="lead mb-5 text-2xl font-medium dark:text-white">
                  You're about to pay KES {numberWithCommas(calculateTotalPrice())} for your order.
                </p>

                <div className="form-group">
                  <button
                    onClick={payWithPaystack}
                    className='text-sm font-bold tracking-wide border px-1.5 py-2 rounded-lg hover:scale-105 duration-200 hover:bg-white hover:text-gray-400 text-black dark:text-white dark:hover:text-black/40'
                  >
                    Make Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Checkout