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
// import {supabase} from "../../utils/supabaseClient";
const supabase = createClient(
  'https://xjpwqafgdolpfjbfwtxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI'
);

//Dashboard
const DashBoard = () => {
  const [order, setOrder] = useState(true);
  const [ordersData, setOrdersData] = useState([]);

  const fetchOrders = async () => {
    console.log('fetching orders');
    const { data } = await supabase.from('orders').select();
    console.log(data);
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

    const data = await Governance.connect(_signer).addressToBrand(
      '0x90F79bf6EB2c4f870365E785982E1f101E93b906'
    );
    console.log('data', data);
  };
  useEffect(() => {
    document.title = 'Smartkart | DashBoard';
    fetchOrders();
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
      console.log(item);
      ordersRow.push({
        id: item.order_id,
        email: item.email,
        orderAmount: item.order_amount,
        // brandId: item.brandid,
        coinsAwarded: item.coinsawarded,
      });
    });
  console.log('ordersTb', ordersRow);

  const transOrder = [];
  // orders &&
  //   orders.forEach((item) => {
  //     rowsOrder.push({
  //       id: item._id,
  //       itemsQty: item.orderItems.length,
  //       amount: item.totalPrice,
  //       status: item.orderStatus,
  //     });
  //   });

  const transTableColumn = [
    { field: 'id', headerName: 'Order ID', minWidth: 200, flex: 0.5 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, 'status') === 'Delivered'
      //     ? 'greenColor'
      //     : 'redColor';
      // },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
    },
  ];

  const rowsOrder = [];
  // orders &&
  //   orders.forEach((item) => {
  //     rowsOrder.push({
  //       id: item._id,
  //       itemsQty: item.orderItems.length,
  //       amount: item.totalPrice,
  //       status: item.orderStatus,
  //     });
  //   });

  return (
    <Wrapper className='page-100'>
      <div>
        <div className='top_dash'>
          <Card
            title='Total Coins left'
            color={cardsData[0].color}
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
              rows={rowsOrder}
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
