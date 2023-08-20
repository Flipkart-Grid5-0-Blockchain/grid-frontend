import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';
// import { supabase } from '../../utils/supabaseClient';
import { FeaturedProducts, Hero, Services, Contact } from '../../components';
import { useUserContext } from '../../context/user_context';
import { connect } from '../../utils/constants';
import ContractABI from '../../utils/Contract-Constants/abi.json';
import ContractAddresses from '../../utils/Contract-Constants/address.json';
import RewardABI from '../../utils/Contract-Constants/rewardAbi.json';

const HomePage = () => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const { currentUser } = useUserContext();
  console.log(currentUser);
  const supabase = createClient(
    'https://xjpwqafgdolpfjbfwtxt.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI'
  );
 console.log(currentUser);
  const dataArray = [
    {
      type: 1,
      expiry: new Date('2023-08-31'),
      amount: 100,
      brandId: 1,
      brandAddress: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    },
    {
      type: 2,
      expiry: new Date('2023-09-15'),
      amount: 50,
      brandId: 2,
      brandAddress: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    },
    {
      type: 1,
      expiry: new Date('2023-08-25'),
      amount: 75,
      brandId: 1,
      brandAddress: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    },
    // ... add more dummy data
  ];

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

  async function updationCall() {
    //Extract data from tokensData table
    try {
      const email = currentUser?.email;
      const { data } = await supabase
        .from('tokensdata') // Replace with your table name
        .select('transactions')
        .eq('email', email);
      console.log(data);

      let availableCoins = 0;
      let brandCoins = 0;
      const temporaryArray = [];
      const brandDeductions = {}; // Object to store brand deductions
      const brandAddressesArray = [];
      const deductionAmountsArray = [];

      // Get the current time
      const currentTime = new Date();

      // Process each JSON object in the array
      dataArray.forEach((data) => {
        const { type, expiry, amount, brandId, brandAddress } = data;

        // Check if the expiry time is greater than the current time
        if (expiry > currentTime) {
          //Discard those objects from the array whose expiry date has reached
          temporaryArray.push(data);
          //Parallely also calculate decrement in available coins and reedem brand rewards and also update on the blockchain
          if (type === 1) {
            brandCoins += amount;

            // Store brand deductions
            if (!brandDeductions[brandAddress]) {
              brandDeductions[brandAddress] = 0;
            }
            brandDeductions[brandAddress] += amount;
          } else {
            availableCoins += amount;
          }
        }
      });

      for (const [brandAddress, deductionAmount] of Object.entries(
        brandDeductions
      )) {
        brandAddressesArray.push(brandAddress);
        deductionAmountsArray.push(deductionAmount);
      }

      // Now temporaryArray contains filtered objects
      console.log('Temporary Array:', temporaryArray);
      console.log(brandAddressesArray, deductionAmountsArray);
      // Final values of availableCoins and brandCoins
      console.log('Available Coins:', availableCoins);
      console.log('Brand Coins:', brandCoins);
      const updatedTransactions = temporaryArray;

      // Update the 'transactions' column in the Supabase table
      const { _data, error } = await supabase
        .from('tokensdata') // Replace with your table name
        .update({ transactions: updatedTransactions })
        .eq('email', 'ww@gmail.com')
        .select();
      if (error) {
        console.error('Error updating data:', error);
      } else {
        console.log('Data updated successfully:', _data);
      }
      //Update the thing parallely on databse as well as blockchain
      if (brandCoins > 0) {
        const _provider = await new ethers.BrowserProvider(window.ethereum);
        const _signer = await _provider.getSigner();
        console.log(provider, _signer.address);

        const contractAddress = ContractAddresses['31337']['Governance'];

        const Governance = await new ethers.Contract(
          contractAddress,
          ContractABI,
          _provider
        );
        console.log(Governance);

        try {
          const tx = await Governance.connect(_signer).expireTokens(
            brandCoins,
            brandAddressesArray,
            deductionAmountsArray,
            availableCoins
          );
          await tx.wait();

          console.log('Transaction successful:', tx);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    } catch (err) {
      console.log(err);
      // alert('Some error occurred');
    }
  }

  useEffect(() => {
    connect();
    getProviderAndSigner();
    updationCall();
  }, []);

  useEffect(() => {
    document.title = 'Smartkart | Home';
  }, []);

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
