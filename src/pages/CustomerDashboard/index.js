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
//Dashboard
const CustomerDashBoard = () => {
  const [order, setOrder] = useState(true);
  useEffect(() => {
    document.title = 'Smartkart | DashBoard';
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ordersTableColumn = [
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
          <div className='left-cards'>
            <Card
              title='Total Coins left'
              color={cardsData[0].color}
              value={2}
              type={0}
            />

            <Card
              title='Total Coins left'
              color={cardsData[0].color}
              value={2}
              type={0}
            />

            <Card
              title='Total Coins left'
              color={cardsData[0].color}
              value={2}
              type={0}
            />
          </div>

          <CoinSend />
        </div>

        <div className='mid-heading'>BRAND COUPONS</div>
        <div className='mid-dash'>
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
