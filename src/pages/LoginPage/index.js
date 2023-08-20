import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
  const { loginUser, signInWithGoogle } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isToggled, setToggle] = useState(0);

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
      const registerBrand = await Governance.connect(_signer).registerAddress();
      await registerBrand.wait();
    } else {
      const registerCustomer = await Governance.connect(_signer).registerUser(
        email
      );
      await registerCustomer.wait();
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
    registerUserMetamask();
    setIsSubmitting(true);
    loginUser(email, password)
      .then((res) => {
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
            className='btn-new login-btn'
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
            className='btn-new google-btn'
            disabled={isSubmitting}
            onClick={() => {
              signInWithGoogle()
                .then((user) => {
                  registerUserMetamask().then(() => {
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

        <div className='role-picker'>
          <FormControl>
            <FormLabel id='demo-row-radio-buttons-group-label'>
              <div className='role-text'>Select a Role</div>{' '}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel
                value='brand'
                control={<Radio />}
                label='Brand'
                onClick={handleToggle}
              />
              <FormControlLabel
                value='customer'
                control={<Radio />}
                label='Customer'
                onClick={handleToggle}
              />
            </RadioGroup>
          </FormControl>
          <button className='btn' onClick={handleToggle}>
            {isToggled ? 'Login as Customer' : 'Login as Brand'}
          </button>
          {/* <p>
            Toggle is{' '}
            {isToggled ? 'Logged in as Customer' : 'Logged in as Brand '}.
          </p> */}
        </div>
      </div>
    </Wrapper>
  );
}

export default LoginPage;
