import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
// import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useCartContext } from '../../context/cart_context';
import { useUserContext } from '../../context/user_context';
import { useOrderContext } from '../../context/order_context';
import { formatPrice } from '../../utils/helpers';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { payment_url as url } from '../../utils/constants';
import { DataGrid } from '@material-ui/data-grid';
import { createClient } from '@supabase/supabase-js';
import { useProductsContext } from '../../context/products_context';
const supabase = createClient(
  'https://xjpwqafgdolpfjbfwtxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI'
);

// const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const {
    cart,
    total_amount,
    total_after_redeem,
    shipping_fee,
    clearCart,
    kart,
    brand,
  } = useCartContext();
  const { shipping, placeOrder } = useOrderContext();
  const { currentUser } = useUserContext();
  const history = useHistory();
  const { products } = useProductsContext();

  // STRIPE STUFF
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [orderId,setOrderId] = useState(0);
  // const stripe = useStripe();
  // const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const addOrders = async () => {
    console.log('updating orders');
    let { data, error } = await supabase
      .from('orders')
      .insert([
        {
          email: currentUser.email,
          shippingdetails: shipping,
          coinsawarded: 10,
          brandid: 5,
          brandAddress: 'asa',
          order_amount:
            total_after_redeem === 0 ? total_amount : total_after_redeem,
          timestamp: new Date(),
        },
      ])
      .select();

    if (error) console.error(error);
    // else console.log("mydata",data);
    // console.log(data[0].order_id);
    setOrderId(data[0].order_id);
    return data[0].order_id;
  };

  const addBrandsCoins = async (orderId) => {
    console.log('updating brands');

    for (const item of cart) {
      console.log('id',orderId);
      const { data } = await supabase.rpc('add_brands_data', {
        _brandid: item.company_id,
        _email: currentUser.email,
        _transaction: {
          order_id: orderId,
          order_amount:
            total_after_redeem === 0 ? total_amount : total_after_redeem,
          order_timestamp: new Date(),
        },
        _reward: {},
      });

      if (error) {
        console.error(error);
      } else {
        console.log('Thisssssss', data);
      }
    }
  };

  const addTxs = async () => {
    console.log('updating transactions');

    let { data, error } = await supabase.rpc('add_tokens_data', {
      _email: currentUser.email,
      _address: '0x07',
      _transaction: {
        timestamp: new Date(),
        expiry: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        type: 0,
        coins_awarded: 10,
      },
    });

    if (error) console.error(error);
    else console.log(data);
  }

  const handleSubmit = async (ev) => {
    console.log("user",currentUser)
    ev.preventDefault();
    setProcessing(true);
    console.log(total_amount, total_after_redeem, brand, kart);
    const __id = await addOrders();
    await addBrandsCoins(__id);
    await addTxs();
    setError(null);
    setProcessing(false);
    setSucceeded(true);
    // await placeOrder();
    setTimeout(() => {
      clearCart();
      history.push('/');
    }, 5000);
    //   }
  };

  return (
    <div>
      {succeeded ? (
        <article>
          <h4>Thank You!</h4>
          <h4>Your payment was successfull</h4>
          <h4>Redirecting to Order page shortly</h4>
        </article>
      ) : (
        <article>
          <h4>
            Hello,
            {currentUser &&
              (currentUser?.displayName
                ? currentUser.displayName
                : currentUser.email)}
          </h4>
          <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
          <p>Test Card Number: 4242 4242 4242 4242</p>
        </article>
      )}
      <form id='payment-form' onSubmit={handleSubmit}>
        {/* <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        /> */}
        <button id='submit'>
          <span id='button-text'>
            {/* {processing ? <div className='spinner' id='spinner'></div> : 'Pay'} */}
            Pay
          </span>
        </button>
        {/* show any errors that happens while processing the payment */}
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        {/* show a success message on completion */}
        <p
          className={`${
            succeeded ? 'result-message' : 'result-message hidden'
          }`}
        >
          Payment succeeded, your items will arrive at your doorstep soon.
        </p>
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      {/* <Elements stripe={promise}> */}
      <CheckoutForm />
      {/* </Elements> */}
    </Wrapper>
  );
};

export default StripeCheckout;
