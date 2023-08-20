import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import { useUserContext } from '../../context/user_context';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useMounted from '../../hooks/useMounted';
import { toast } from 'react-toastify';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import Button from '../../components/Button';
import { ethers } from 'ethers';
import ContractABI from '../../utils/Contract-Constants/abi.json';
import ContractAddresses from '../../utils/Contract-Constants/address.json';

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const mounted = useMounted();
  const { loginUser, signInWithGoogle, handleType, handleChangeAddress } =
    useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isToggled, setToggle] = useState(0);

  async function connectAddress() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
      console.log('Connected');
      const _provider = await new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      handleChangeAddress(_signer.address)
    } else {
      alert('Please install metamask');
    }

  }
  async function registerUserMetamask() {
    const _provider = await new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();

    const contractAddress = ContractAddresses['31337']['Governance'];


    const Governance = await new ethers.Contract(
      contractAddress,
      ContractABI,
      _provider
    );

    console.log(Governance);
    if (isToggled) {
      handleType(1);
    } else {
      handleType(0);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('Please enter e-mail');
    }

    if (!password) {
      return toast.error('Please enter password');
    }
    setIsSubmitting(true);
    loginUser(email, password)
      .then((res) => {
        connectAddress();
        handleType(isToggled);
        history.push(location.state?.from ?? '/');
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`);
      })
      .finally(() => mounted.current && setIsSubmitting(false));
  };

  function togglePasswordVisibility() {
    setVisible(!visible);
  }

  const handleToggle = () => {
    setToggle(!isToggled);
  };

  useEffect(() => {
    document.title = 'Smartkart | Login';
  }, []);

  return (
    <Wrapper className='page-100'>
      <div>
        <div className='title'>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* email */}
          <div className='form-control'>
            <input
              type='email'
              name='email'
              className='input'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* end email */}
          {/* pass */}
          <div className='form-control password'>
            <input
              type={!visible ? 'password' : 'text'}
              name='password'
              className='input'
              placeholder='Password'
              value={password}
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={togglePasswordVisibility} className='togglebtn'>
              {!visible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>
          {/* end pass */}
          {/* links */}
          <div className='links'>
            <Link to='/forgot-password' className='link'>
              forgot password?
            </Link>
            <Link to='/register' className='link'>
              register
            </Link>
          </div>
          {/* end links */}
          <Button
            type='submit'
            className='btn login-btn'
            disabled={isSubmitting}
          >
            login
          </Button>
          <div className='seperator'>
            <hr />
            <span>or</span>
          </div>
          <button
            type='button'
            className='btn google-btn'
            disabled={isSubmitting}
            onClick={() => {
              signInWithGoogle()
                .then((user) => {
                  registerUserMetamask().then(() => {
                    connectAddress();
                  handleType(isToggled)
                    history.push('/');
                  });
                })
                .catch((err) => {
                  toast.error(`Error: ${err.message}`);
                });
            }}
          >
            sign in with google
          </button>
        </form>

        <div>
          <button onClick={handleToggle}>
            {isToggled ? 'Login as Customer' : 'Login as Brand'}
          </button>
          <p>
            Toggle is{' '}
            {isToggled ? 'Logged in as Customer' : 'Logged in as Brand '}.
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export default LoginPage;
