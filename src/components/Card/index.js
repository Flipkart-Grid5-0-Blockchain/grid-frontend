import React, { useState } from 'react';
import Wrapper from './styles';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';
import ContractABI from '../../utils/Contract-Constants/abi.json';
import ContractAddresses from '../../utils/Contract-Constants/address.json';
import RewardABI from '../../utils/Contract-Constants/rewardAbi.json';

const supabase = createClient(
  'https://xjpwqafgdolpfjbfwtxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI'
);

// parent Card

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrapper>
      <AnimateSharedLayout>
        {expanded ? (
          <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
        ) : (
          <CompactCard param={props} setExpanded={() => setExpanded(true)} />
        )}
      </AnimateSharedLayout>
    </Wrapper>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const [address, setAddress] = useState('');
  const [value, setValue] = useState(0);

  async function handleRewardCall() {
    const _provider = await new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();

    console.log(address, value,ContractAddresses['31337']['Governance']);
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

    console.log(address, value,ContractAddresses['31337']['Governance']);
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
    <div className='CompactCard' layoutId='expandableCard'>
      <div className='detail'>
        <span>{param.title}</span>
        {param.type === 0 ? (
          <span>{param.value}</span>
        ) : (
          <span className='input-container'>
            <input
              className='input'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Address'
            ></input>
            <input
              className='input'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder='coins'
            ></input>
            <button className='btn' onClick={() => handleRewardCall()}>
              Send
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  return (
    <motion.div
      className='ExpandedCard'
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId='expandableCard'
    >
      <span>{param.title}</span>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;
