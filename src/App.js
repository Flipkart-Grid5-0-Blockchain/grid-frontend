import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer, Toast, ErrorBoundary } from './components';
import { useProductsContext } from './context/products_context';
import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';
import 'react-toastify/dist/ReactToastify.css';
import {
  Home,
  About,
  Products,
  Cart,
  SingleProduct,
  Checkout,
  Error,
  Login,
  Register,
  Forgot,
  Reset,
  OrdersPage,
  PrivateRoute,
  ProfilePage,
  DashBoard,
  CustomerDashBoard,
} from './pages';

function App() {
  const { isSidebarOpen } = useProductsContext();
  const overflowPropertyToHideScroll =
    isSidebarOpen === true ? 'hidden' : 'scroll';

  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  const SUPASBASE_ANON_KEY = 'https://xjpwqafgdolpfjbfwtxt.supabase.co';
  const SUPABASE_URL =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHdxYWZnZG9scGZqYmZ3dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAxNjcsImV4cCI6MjAwNzU5NjE2N30.x_Tebi8nzJfF2eQyJTjRRqmrGHieA1CxpnLSyrhUAUI';

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

  async function connectSupabase() {
    console.log(SUPABASE_URL, SUPASBASE_ANON_KEY)
    const supabase = await createClient(SUPABASE_URL, SUPASBASE_ANON_KEY);

    console.log('DAS', supabase);
    const { data } = await supabase.from('brands').select();
    console.log(data);
    console.log('connected');
  }

  useEffect(() => {
    connect();
    getProviderAndSigner();
    connectSupabase();
  }, []);

  return (
    <div style={{ maxHeight: '100vh', overflow: overflowPropertyToHideScroll }}>
      <Router>
        <Toast />
        <Navbar />
        <Sidebar />
        <ErrorBoundary>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/products'>
              <Products />
            </Route>
            <Route exact path='/cart'>
              <Cart />
            </Route>
            <PrivateRoute exact path='/login'>
              <Login />
            </PrivateRoute>
            <PrivateRoute exact path='/dash'>
              <DashBoard />
            </PrivateRoute>
            <PrivateRoute exact path='/customer-dash'>
              <CustomerDashBoard />
            </PrivateRoute>
            <PrivateRoute exact path='/register'>
              <Register />
            </PrivateRoute>
            <PrivateRoute exact path='/forgot-password'>
              <Forgot />
            </PrivateRoute>
            <PrivateRoute exact path='/reset-password'>
              <Reset />
            </PrivateRoute>
            <Route exact path='/products/:id' children={<SingleProduct />} />
            <PrivateRoute exact path='/checkout'>
              <Checkout />
            </PrivateRoute>
            <PrivateRoute exact path='/orders'>
              <OrdersPage />
            </PrivateRoute>
            <PrivateRoute exact path='/profile'>
              <ProfilePage />
            </PrivateRoute>
            <Route exact path='*'>
              <Error />
            </Route>
          </Switch>
        </ErrorBoundary>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
