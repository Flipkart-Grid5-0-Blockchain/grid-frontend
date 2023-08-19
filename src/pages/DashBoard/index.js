import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { createClient } from '@supabase/supabase-js';
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
  useEffect(() => {
    document.title = 'Smartkart | DashBoard';
    fetchOrders();
  }, []);

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
      console.log(item)
      ordersRow.push({
        id: item.order_id,
        email: item.email,
        orderAmount: item.order_amount,
        // brandId: item.brandid,
        coinsAwarded: item.coinsawarded,
      });
    });
  console.log("ordersTb",ordersRow);

  const transTableColumn = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
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
      minWidth: 270,
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

  return (
    <Wrapper className='page-100'>
      <div>
        <div className='top_dash'>
          <div className='dashboardSummaryBox2'>
            <Link>
              <p>Total Coins left</p>
              <p>{2}</p>
            </Link>
          </div>
          <div>
            <div>--Send Coins</div>
            <div>
              <span>Address:</span>
              <input type='text'></input>
              <button>Send</button>
            </div>
          </div>
        </div>
        <div className='tables_seller'>
          <div className='headings'>
            <p
              className={order ? 'heading_table bottom' : 'heading_table'}
              onClick={() => setOrder(!order)}
            >
              Order History
            </p>
            <p
              className={!order ? 'heading_table bottom' : 'heading_table'}
              onClick={() => setOrder(!order)}
            >
              User Transactions
            </p>
          </div>
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
                <h1 id='productListHeading'>Transactions History</h1>

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
      </div>
    </Wrapper>
  );
};

export default DashBoard;
