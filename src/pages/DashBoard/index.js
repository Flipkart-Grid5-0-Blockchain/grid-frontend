import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { createClient } from '@supabase/supabase-js';
import Card from '../../components/Card';
import CoinSend from '../../components/CoinSend';
import { cardsData } from '../../Data/Data';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ethers } from 'ethers';
import ContractABI from '../../utils/Contract-Constants/abi.json';
import ContractAddresses from '../../utils/Contract-Constants/address.json';
import RewardABI from '../../utils/Contract-Constants/rewardAbi.json';
import { useUserContext } from '../../context/user_context';
// import {supabase} from "../../utils/supabaseClient";
const supabase = createClient(
  'https://xjpwqafgdolpfjbfwtxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI'
);

//Dashboard
const DashBoard = () => {
  const [order, setOrder] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  //  const { currentUser, userType, userAddress } = useUserContext();
  // const [signerAddress, setSignerAddress] = useState('');

  // useEffect(() => {
  //     const signerAdd = async() => {
  //     const _provider = await new ethers.BrowserProvider(window.ethereum);
  //     const _signer = await _provider.getSigner();
      
  //     console.log('signer', _signer);
  //     setSignerAddress(_signer._address);
  //   }
  //   signerAdd();
  //   }, [order]);

async function getAddress(){
  const _provider = await new ethers.BrowserProvider(window.ethereum);
  const _signer =  await _provider.getSigner();
  const address = await _signer.address;
  return address;
}
  const fetchOrders = async () => {
    console.log('fetching orders');
    let { data } = await supabase.from('orders').select();
    const userAddress = await getAddress();
    console.log('userAddress', userAddress);
    data = data.filter((item) => item.brandAddress === userAddress);
    setOrdersData(data);
  };

  const fetchOrderTansactionData = async () => {
    const _provider = await new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();
    const governanceAddress = ContractAddresses['31337']['Governance'];

    const Governance = await new ethers.Contract(
      governanceAddress,
      ContractABI,
      _provider
    );
      const userAddress = await getAddress();
    const data = await Governance.connect(_signer).addressToBrand(
      userAddress
    );
    console.log('data', data);
  };

  const fetchTxs = async () => {
    console.log('fetching txs');
    let { data: brands, error } = await supabase
      .from('brands')
      .select();

      
    const userAddress = await getAddress();
    brands = brands.filter((item) => item.brandaddress === userAddress);
      // console.log('............fetched data.............', brands);
      // console.log('............fetched data.............', userAddress);
    setBrandsData(brands);
  }
  useEffect(() => {
    document.title = 'Smartkart | DashBoard';
    fetchOrders();
    fetchTxs();
  }, []);

  useEffect(() => {
    fetchOrderTansactionData();
    console.log('Called');
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const ordersTableColumn = [
    { field: 'id', headerName: 'Order Id', minWidth: 300, flex: 1 },

    {
      field: 'email',
      headerName: 'email',
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: 'orderAmount',
      headerName: 'orders amount',
      type: 'number',
      minWidth: 150,
      flex: 0.4,
    },

    // {
    //   field: 'brandId',
    //   headerName: 'Brand Id',
    //   type: 'number',
    //   minWidth: 270,
    //   flex: 0.5,
    // },

    {
      field: 'coinsAwarded',
      flex: 0.3,
      headerName: 'coins Awarded',
      minWidth: 150,
      type: 'number',
      sortable: true,
    },
  ];

  const ordersRow = [];
  ordersData &&
    ordersData.forEach((item) => {
      ordersRow.push({
        id: item.order_id,
        email: item.email,
        orderAmount: item.order_amount,
        // brandId: item.brandid,
        coinsAwarded: item.coinsawarded,
      });
    });

  const transOrder = [];
  brandsData &&
  brandsData.forEach((item) => {
      let awards = 0;
     item.rewards && 
        item.rewards.forEach((val) => {
          // console.log('valhdaskjdhsjkaDHlkHADLKHSALKDJhASLKJDhSAJKhdjnA>S<KJdhASLKJ', val);
          if (Object.keys(val).length !== 0)
            awards += val.rewards?.amount;
        })

      transOrder.push({
        id: item.transactions[0].order_id,
        userAddress: item.useraddress,
        totalTransactions: item.transactions.length,
        totalRewardedCoins: awards !== 0 ? awards : 0,
        lastRewarddate: awards !== 0 ? item.rewards[item.rewards.length - 1] : "",
      });
    });
  // console.log('tx order data', brandsData);
  // console.log("tx order data", transOrder)

  const transTableColumn = [
    {
      field: 'id',
      headerName: 'User Id',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'userAddress',
      headerName: 'User Address',
      type: 'number',
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: 'totalTransactions',
      headerName: 'Total Transactions',
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: 'totalRewardedCoins',
      headerName: 'Total Rewarded Coins',
      type: 'number',
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: 'lastRewarddate',
      flex: 0.3,
      headerName: 'Last Reward Date',
      minWidth: 150,
      type: 'number',
      sortable: false,
    },
  ];

  return (
    <Wrapper className='page-100'>
      <div>
        <div className='top_dash'>
          <Card
            title='Total Coins left'
            color={'var(--clr-primary-3)'}
            value={2}
            type={0}
          />

          <CoinSend />
        </div>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label='Order History' onClick={() => setOrder(!order)} />
            <Tab label='User Transactions' onClick={() => setOrder(!order)} />
          </Tabs>
        </Box>
        {order ? (
          <div className='productListContainer'>
            <h1 id='productListHeading'>ALL ORDERS</h1>

            <DataGrid
              rows={ordersRow}
              columns={ordersTableColumn}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
            />
          </div>
        ) : (
          <div>
            <div className='productListContainer'>
              <h1 id='productListHeading'>TRANSACTIONS HISTORY</h1>

              <DataGrid
                rows={transOrder}
                columns={transTableColumn}
                pageSize={10}
                disableSelectionOnClick
                className='productListTable'
                autoHeight
              />
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default DashBoard;
