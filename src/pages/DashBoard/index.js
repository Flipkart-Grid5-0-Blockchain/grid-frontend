import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

//Dashboard
const DashBoard = () => {
  const [order, setOrder] = useState(true);
  useEffect(() => {
    document.title = 'Smartkart | DashBoard';
  }, []);

  const ordersTableColumn = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

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

  const transTableColumn = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

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
