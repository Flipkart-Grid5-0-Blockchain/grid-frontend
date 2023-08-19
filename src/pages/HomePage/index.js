import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { supabase } from '../../utils/supabaseClient';
import { FeaturedProducts, Hero, Services, Contact } from '../../components';
import { useUserContext } from '../../context/user_context';

const HomePage = () => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const { currentUser } = useUserContext();

  const dataArray = [
    {
      type: 1,
      expiry: new Date('2023-08-31T12:00:00'), // Example expiry date in the future
      amount: 100,
    },
    {
      type: 2,
      expiry: new Date('2023-09-15T18:00:00'), // Example expiry date in the future
      amount: 50,
    },
    {
      type: 1,
      expiry: new Date('2023-08-20T09:00:00'), // Example expiry date in the past
      amount: 200,
    },
    {
      type: 4,
      expiry: new Date('2023-08-31T12:00:00'), // Example expiry date in the future
      amount: 100000,
    },
  ];

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

  async function updationCall() {
    //Extract data from tokensData table
    try {
      const email = currentUser.email;
      const { data } = await supabase
        .from('tokensdata') // Replace with your table name
        .select('transactions')
        .eq('email', email);
      console.log(data);

      let availableCoins = 0;
      let brandCoins = 0;
      const temporaryArray = [];

      // Get the current time
      const currentTime = new Date();

      // Process each JSON object in the array
      dataArray.forEach((data) => {
        const { type, expiry, amount } = data;

        // Check if the expiry time is greater than the current time
        if (expiry > currentTime) {
          //Discard those objects from the array whose expiry date has reached
          temporaryArray.push(data);
          //Parallely also calculate decrement in available coins and reedem brand rewards and also update on the blockchain
          if (type === 1) {
            brandCoins += amount;
          } else {
            availableCoins += amount;
          }
        }
      });

      // Now temporaryArray contains filtered objects
      console.log('Temporary Array:', temporaryArray);

      // Final values of availableCoins and brandCoins
      console.log('Available Coins:', availableCoins);
      console.log('Brand Coins:', brandCoins);
      const updatedTransactions = temporaryArray;

      // Update the 'transactions' column in the Supabase table
      const { _data, error } = await supabase
        .from('tokensdata') // Replace with your table name
        .update({ transactions: updatedTransactions })
        .eq('email', email);

      if (error) {
        console.error('Error updating data:', error);
      } else {
        console.log('Data updated successfully:', _data);
      }
    } catch (err) {
      console.log(err);
      alert('Some error occurred');
    }

    //Update the thing parallely on databse as well as blockchain
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
