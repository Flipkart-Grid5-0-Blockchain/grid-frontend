import React, { useState } from 'react';
import Wrapper from './styles';
import { useCartContext } from '../../context/cart_context';
import { useUserContext } from '../../context/user_context';
import { formatPrice } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';
import ContractABI from '../../utils/Contract-Constants/abi.json';
import ContractAddresses from '../../utils/Contract-Constants/address.json';
import RewardABI from '../../utils/Contract-Constants/rewardAbi.json';

const supabase = createClient(
  'https://xjpwqafgdolpfjbfwtxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI'
);

const CoinSend = ({ total_amount, shipping_fee }) => {
  const { currentUser } = useUserContext();
  const [address, setAddress] = useState('');
  const [value, setValue] = useState(0);

  async function handleRewardCall() {
    const _provider = await new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();

    console.log(address, value, ContractAddresses['31337']['Governance']);
    const governanceAddress = ContractAddresses['31337']['Governance'];

    const Governance = await new ethers.Contract(
      governanceAddress,
      ContractABI,
      _provider
    );

    const rewardAddress = ContractAddresses['31337']['RewardToken'];
    const RewardToken = await new ethers.Contract(
      rewardAddress,
      RewardABI,
      _provider
    );

    console.log(address, value, ContractAddresses['31337']['Governance']);
    const tx = await RewardToken.connect(_signer).approve(
      ContractAddresses['31337']['Governance'],
      100
    );
    await tx.wait();
    const tx1 = await Governance.connect(_signer).rewardUser(
      address.toString(),
      value
    );
    await tx1.wait();

    //Left to update supabase
    console.log('Transaction completed');
  }

  return (
    <Wrapper>
      <div>
        <h4>Send Coins</h4>
        <div>
          <div className='inputs'>
            <input
              className='input'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
            <input
              className='input'
              placeholder='coins'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <button className='btn' onClick={() => handleRewardCall()}>
          Send
        </button>
      </div>
    </Wrapper>
  );
};

export default CoinSend;
