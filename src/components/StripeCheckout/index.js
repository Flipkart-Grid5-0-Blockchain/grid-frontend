import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import { ethers } from 'ethers';
import ContractABI from '../../utils/Contract-Constants/abi.json';
import ContractAddresses from '../../utils/Contract-Constants/address.json';
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
import RewardABI from '../../utils/Contract-Constants/rewardAbi.json';

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
  const [orderId, setOrderId] = useState(0);
  const [provider, setProvider] = useState(null);
  // const stripe = useStripe();
  // const elements = useElements();

  // useEffect(() => {
  //   console.log(ContractABI);
  //   console.log(ContractAddresses)
  // },[])

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

  async function getProviderAndSigner() {
    try {
      const _provider = await new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      setProvider(_provider);
    } catch (err) {
      console.log(err);
    }
  }

  const addTokens = async () => {
    const _provider = await new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();

    const contractAddress = ContractAddresses['31337']['Governance'];

    const Governance = await new ethers.Contract(
      contractAddress,
      ContractABI,
      _provider
    );

    console.log('Executing function');

    try {
      /*This has to be put in the login page */
      const tx1 = await Governance.connect(_signer).registerUser('sam');
      await tx1.wait();
      console.log(kart);

      const userCoinsAvailable = await Governance.connect(
        _signer
      ).getUserTotalCoins(_signer.address);

      console.log('userCoinsAvailable', userCoinsAvailable);

      const __brandAddress = '0x94749eF103DE6B10f36258d3C958e04099ee80FF';
      console.log(__brandAddress, _signer.address);
      const userBrandCoins = await Governance.connect(
        _signer
      ).getUserBrandCoins(_signer.address, __brandAddress);
      console.log('userBrandCoins', userBrandCoins);

      const email = currentUser?.email;

      const { data } = await supabase
        .from('tokensdata') // Replace with your table name
        .select('transactions')
        .eq('email', 'ww@gmail.com');

      let transactionArray = data[0].transactions;
      console.log(data[0].transactions, transactionArray);

      var updatedArray;
      console.log('--------Getting into updatioonnnnnnnn--------');

      if (kart != 0 && brand == 0) {
        if (parseInt(userCoinsAvailable) >= kart) {
          const tx = await Governance.connect(_signer).redeemCoins(kart);
          await tx.wait();

          // Make supabase calls over it
          updatedArray = transactionArray.filter((data) => {
            if (kart > 0) {
              const { amount } = data;
              if (amount <= kart) {
                kart -= amount;
                return false;
              } else {
                data.amount -= kart;
                kart = 0;
              }
            }
            return true;
          });
        } else {
          return toast.error('You do not have enough coins to redeem');
        }
      }

      /***********Updationnnnnn of branddddddd reward datatataatat-------- */
      if (kart == 0 && brand != 0) {
        if (parseInt(userBrandCoins) >= brand) {
          const brandAddress = '0x07442396349695396753978693698757';
          const tx = await Governance.connect(_signer).redeemBrandReward(
            brandAddress,
            kart
          );
          await tx.wait();
          /*********** Addd the condition for brandId and other  things */

          const brandId = 8;
          updatedArray = transactionArray.filter((data) => {
            if (
              brand > 0 &&
              data.brandAddress == brandAddress &&
              data.id == brandId
            ) {
              const { amount } = data;
              if (amount <= brand) {
                brand -= amount;
                return false; // Remove the object from the array
              } else {
                data.amount -= brand; // Deduct brand value from the current object
                brand = 0;
              }
            }
            return true; // Keep the object in the array
          });
        } else {
          return toast.error('You do not have enough coins to redeem');
        }
      }

      const tx = await Governance.connect(_signer).purchaseItem(
        1000000,
        '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'
      );
      await tx.wait();
      console.log(tx);

      const data1 = await Governance.connect(_signer).getUserTotalCoins(
        _signer.address
      );

      const { _data, error } = await supabase
        .from('tokensdata') // Replace with your table name
        .update({ transactions: updatedArray })
        .eq('email', email)
        .select();
      if (error) {
        console.error('Error updating data:', error);
      } else {
        console.log('Data updated successfully:', _data);
      }
      console.log(parseInt(data1));
    } catch (error) {
      if (error.data) {
        const decodedError = Governance.interface.parseError(error.data);
        console.log(`Transaction failed: ${decodedError?.name}`);
      }
      console.error(error);
    }
  };
  const addOrders = async () => {
    const _provider = await new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();
    console.log('updating orders');
    let { data, error } = await supabase
      .from('orders')
      .insert([
        {
          email: currentUser.email,
          shippingdetails: shipping,
          coinsawarded: 10,
          brandid: 5,
          brandAddress: _signer,
          order_amount:
            total_after_redeem === 0 ? total_amount : total_after_redeem,
          timestamp: new Date(),
        },
      ])
      .select();

    if (error) console.error(error);
    setOrderId(data[0].order_id);
    return data[0].order_id;
  };

  const addBrandsCoins = async (orderId) => {
    console.log('updating brands');

    for (const item of cart) {
      console.log('id', orderId);
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
      _address: '0x0788', // change in supabase that only email has to be removed
      _transaction: {
        timestamp: new Date(),
        expiry: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        type: 0,
        coins_awarded: 10,
      },
    });

    if (error) console.error(error);
    else console.log(data);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    // console.log(total_amount, total_after_redeem, brand, kart);
    try {
      await addTokens();
      const __id = await addOrders();
      await addBrandsCoins(__id);
      await addTxs();
    } catch (err) {
      console.log('At this block', err);
    }
    setError(null);
    setProcessing(false);
    setSucceeded(true);
    // await placeOrder();
    // setTimeout(() => {
    //   clearCart();
    //   history.push('/');
    // }, 5000);
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
