import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import { useCartContext } from '../../context/cart_context';
import { Link } from 'react-router-dom';
import CartColumns from '../CartColumns/';
import CartItem from '../CartItem/';
import CartTotals from '../CartTotals/';
import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';

const CartContent = () => {
  const { cart, clearCart } = useCartContext();
  const [normalCoins, setNormalCoins] = useState(true);
  const [redeemedCoinsFromKart, setRedeemedCoinsFromKart] = useState(0);
  const [redeemedCoinsFromBrand, setRedeemedCoinsFromBrand] = useState(0);
  const [totalCoinsFromKart, setTotalCoinsFromKart] = useState(100);
  const [totalCoinsFromBrand, setTotalCoinsFromBrand] = useState(100);
  const [kartRedeemValue, setkartRedeemValue] = useState(0);
  const [brandRedeemValue, setBrandRedeemValue] = useState(0);

  let {
    id,
    mainColor,
    mainSize,
    total_amount,
    shipping_fee,
    addToCart,
    product,
    setVal,
  } = useCartContext();
  const [totalAmount, setTotalAmount] = useState(0);

  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  const SUPASBASE_ANON_KEY = 'https://xjpwqafgdolpfjbfwtxt.supabase.co';
  const SUPABASE_URL =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI';

  /*Function to connect to metamask */
  async function connect() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
      console.log('Connected');
    } else {
      alert('Please install metamask');
    }
  }

  async function getProviderAndSigner() {
    try {
      const _provider = await new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      setProvider(_provider);
      console.log(_signer.address);
      console.log(_provider, _signer.address);
    } catch (err) {
      console.log(err);
    }
  }

  async function connectSupabase() {
    console.log(SUPABASE_URL, SUPASBASE_ANON_KEY);
    const supabase = await createClient(SUPABASE_URL, SUPASBASE_ANON_KEY);

    console.log('DAS', supabase);
    const { data } = await supabase.from('brands').select();
    console.log(data);
    console.log('connected');
  }

  useEffect(() => {
    connect();
    getProviderAndSigner();
    connectSupabase();
  }, []);

  function redeemFromKart() {
    console.log('redeem from kart');
    if (kartRedeemValue > totalCoinsFromKart) {
      alert('Not enough coins');
      return;
    }
    setRedeemedCoinsFromKart(kartRedeemValue);
    setTotalAmount(total_amount - kartRedeemValue*100);
    setVal('total_after_redeem', total_amount - kartRedeemValue*100);
    setVal('kart', kartRedeemValue);
    setVal('brand', 0);
  }
  function redeemFromBrand() {
    console.log('redeem from brand');
    if (brandRedeemValue > totalCoinsFromBrand) {
      alert('Not enough coins');
      return;
    }
    setRedeemedCoinsFromBrand(brandRedeemValue);
    setTotalAmount(total_amount - brandRedeemValue * 100);
    setVal('total_after_redeem', total_amount - brandRedeemValue * 100);
    setVal('brand', brandRedeemValue);
    setVal('kart', 0);
  }

  return (
    <Wrapper className='section section-center'>
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />
      <div className='link-container'>
        <Link to='/products' className='link-btn'>
          continue shopping
        </Link>
        <button
          type='button'
          className='link-btn clear-btn'
          onClick={clearCart}
        >
          clear cart
        </button>
      </div>
      <div>
        <h3>Redeem Coins</h3>
        <div>
          <p
            className={normalCoins ? 'highlight' : ' '}
            onClick={() => setNormalCoins(true)}
          >
            Redeem From SmartKart
          </p>
          <p
            className={!normalCoins ? 'highlight' : ' '}
            onClick={() => setNormalCoins(false)}
          >
            Redeem From Brand
          </p>
        </div>
        {normalCoins ? (
          <div>
            <h3>Total Coins From SmartKart are : </h3>
            <p>Enter Coins to Redeem</p>
            <input
              type='number'
              onChange={(e) => setkartRedeemValue(e.target.value)}
            />
            <button onClick={redeemFromKart}>Redeem</button>
          </div>
        ) : (
          <div>
            <h3>Total coins from brand</h3>
            <p>Enter Coins to Redeem</p>
            <input
              type='number'
              onChange={(e) => setBrandRedeemValue(e.target.value)}
            />
            <button onClick={redeemFromBrand}>Redeem</button>
          </div>
        )}
        <CartTotals
          total_amount={totalAmount !== 0 ? totalAmount : total_amount}
          shipping_fee={shipping_fee}
          redeemedCoinsFromKart={redeemedCoinsFromKart}
          redeemedCoinsFromBrand={redeemedCoinsFromBrand}
        />
      </div>
    </Wrapper>
  );
};

export default CartContent;
