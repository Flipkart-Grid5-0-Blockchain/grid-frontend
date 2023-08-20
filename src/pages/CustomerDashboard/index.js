import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import Card from '../../components/Card';
import { GiftCard, CoinSend } from '../../components';
import { cardsData } from '../../Data/Data';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createClient } from '@supabase/supabase-js';
import { useUserContext } from '../../context/user_context';
import { ethers } from 'ethers';
import ContractABI from '../../utils/Contract-Constants/abi.json';
import ContractAddresses from '../../utils/Contract-Constants/address.json';
const supabase = createClient(
  'https://xjpwqafgdolpfjbfwtxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI'
);
//Dashboard
const CustomerDashBoard = () => {
  const [order, setOrder] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const { currentUser } = useUserContext();
  const [brandData, setBrandData] = useState([]);
  const [userCoinsData, setUserCoinsData] = useState([]);

  useEffect(() => {
    document.title = 'Smartkart | DashBoard';
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // function calculateTotalAmount(rewardsArray) {
  //   return rewardsArray.reduce((total, reward) => total + reward.amount, 0);
  // }

  const fetchOrders = async () => {
    console.log('fetching orders');
    let { data } = await supabase
      .from('orders')
      .select()
      .eq('email', currentUser.email);

    setOrdersData(data);
  };

  async function fetchBrandData() {
    console.log('fetching brand data');
    const { data, error } = await supabase
      .from('brands')
      .select()
      .eq('email', currentUser.email);
    // console.log("Sams data is eprinted here",data);

    // console.log(data, 'This one');

    const brandTotalRewards = data.map((item) => {
      let totalRewardCoins = 0;
      item.rewards &&
        item.rewards.forEach((reward) => {
          totalRewardCoins += reward?.amount;
        });
      return {
        brandName: item.brandname ? item.brandname : 'No Name',
        brandAddress: item.brandaddress,
        totalRewardCoins: isNaN(totalRewardCoins) ? 0 : totalRewardCoins,
      };
    });
    // console.log('Sams data is eprinted here', brandTotalRewards);
    setBrandData(brandTotalRewards);
  }

  async function fetchUserCoinsData() {
    const _provider = await new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();

    const contractAddress = ContractAddresses['31337']['Governance'];

    const Governance = await new ethers.Contract(
      contractAddress,
      ContractABI,
      _provider
    );

    const data = await Governance.connect(_signer).addressToUser(
      _signer.address
    );
    // console.log('coinsssssssssssssss', data);

    setUserCoinsData(data);
  }

  useEffect(() => {
    document.title = 'Smartkart | Customer Dashboard';
    fetchOrders();
    fetchBrandData();
    fetchUserCoinsData();
  }, []);
  const ordersTableColumn = [
    { field: 'id', headerName: 'Order ID', minWidth: 200, flex: 0.5 },

    {
      field: 'orderAmount',
      headerName: 'order amount',
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      type: 'number',
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: 'coinsAwarded',
      headerName: 'Coins Awarded',
      type: 'number',
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: 'brandId',
      headerName: 'Brand Id',
      type: 'number',
      minWidth: 200,
      flex: 0.5,
    },
  ];

  const rowsOrder = [];
  // console.log('user orders Data', ordersData);
  ordersData &&
    ordersData.forEach((item) => {
      rowsOrder.push({
        id: item.order_id,
        orderAmount: item.order_amount,
        timestamp: item.timestamp,
        coinsAwarded: item.coinsawarded,
        brandId: item.brandid,
      });
    });

  return (
    <Wrapper className='page-100'>
      <div>
        <div className='top_dash'>
          <div className='left-cards'>
            <Card
              title='Available Coins'
              color={cardsData[0].color}
              value={parseInt(userCoinsData.availableCoins)}
              type={0}
            />

            <Card
              title='Coins on Purchases'
              color={cardsData[0].color}
              value={parseInt(userCoinsData.purchaseCoins)}
              type={0}
            />
            <Card
              title='Coins on Refferal'
              color={cardsData[0].color}
              value={parseInt(userCoinsData.refferalCoins)}
              type={0}
            />
            <Card
              title='Coins Redeemed'
              color={cardsData[0].color}
              value={parseInt(userCoinsData.reedemedCoins)}
              type={0}
            />
          </div>

          {/* <CoinSend /> */}
        </div>

        <div className='mid-heading'>BRAND COUPONS</div>
        <div className='mid-dash'>
          {brandData.map((item) => {
            if(item.totalRewardCoins === 0) return null;
            return (
              <GiftCard
                company={item.brandName}
                title='Brand Coins'
                color={cardsData[1].color}
                value={item.totalRewardCoins}
                type={1}
              />
            );
          })}

          {/* <GiftCard
            company='Apple'
            title='Total Coins left'
            color={cardsData[1].color}
            value={2}
            type={1}
          />

          <GiftCard
            company='Apple'
            title='Total Coins left'
            color={cardsData[1].color}
            value={2}
            type={1}
          />

          <GiftCard
            company='Apple'
            title='Total Coins left'
            color={cardsData[1].color}
            value={2}
            type={1}
          />

          <GiftCard
            company='Apple'
            title='Total Coins left'
            color={cardsData[1].color}
            value={2}
            type={1}
          />
          <GiftCard
            company='Apple'
            title='Total Coins left'
            color={cardsData[1].color}
            value={2}
            type={1}
          />
          <GiftCard
            company='Apple'
            title='Total Coins left'
            color={cardsData[1].color}
            value={2}
            type={1}
          /> */}
        </div>

        <div className='productListContainer'>
          <h1 id='productListHeading'>ALL ORDERS</h1>

          <DataGrid
            rows={rowsOrder}
            columns={ordersTableColumn}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default CustomerDashBoard;
