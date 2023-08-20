import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useUserContext } from '../../context/user_context';
import { Link, useHistory } from 'react-router-dom';
import useMounted from '../../hooks/useMounted';
import { toast } from 'react-toastify';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import Button from '../../components/Button';
import { ethers } from 'ethers';
import ContractABI from '../../utils/Contract-Constants/abi.json';
import ContractAddresses from '../../utils/Contract-Constants/address.json';

function RegisterPage() {
  const history = useHistory();
  const mounted = useMounted();
  const { registerUser, signInWithGoogle, handleType, handleChangeAddress } =
    useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const [isToggled, setToggle] = useState(0);

  const handleToggle = () => {
    setToggle(!isToggled);
  };

  async function connectAddress() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
      console.log('Connected');
      const _provider = await new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      handleChangeAddress(_signer.address);
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
      const registerBrand = await Governance.connect(_signer).registerAddress();
      await registerBrand.wait();
    } else {
      const registerCustomer = await Governance.connect(_signer).registerUser(
        email
      );
      await registerCustomer.wait();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error('Please enter e-mail');
    }

    if (!password) {
      return toast.error('Please enter password');
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords didn't match");
    }

    setIsSubmitting(true);
    registerUser(email, password)
      .then((res) => {
        handleType(isToggled);
        history.push('/');
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`);
      })
      .finally(() => mounted.current && setIsSubmitting(false));
  };

  function togglePasswordVisibility() {
    setIsVisiblePassword(!isVisiblePassword);
  }

  function toggleConfirmPasswordVisibility() {
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
  }

  useEffect(() => {
    document.title = 'Smartkart | Register';
  }, []);

  return (
    <Wrapper className='page-100'>
      <div>
        <div className='title'>
          <h2>Register</h2>
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
              type={!isVisiblePassword ? 'password' : 'text'}
              name='password'
              className='input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div onClick={togglePasswordVisibility} className='togglebtn'>
              {!isVisiblePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>
          <div className='form-control password'>
            <input
              type={!isVisibleConfirmPassword ? 'password' : 'text'}
              name='confirmPassword'
              className='input'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div
              onClick={toggleConfirmPasswordVisibility}
              className='togglebtn'
            >
              {!isVisibleConfirmPassword ? (
                <BsFillEyeSlashFill />
              ) : (
                <BsFillEyeFill />
              )}
            </div>
          </div>
          {/* end pass */}
          <Button
            type='submit'
            className='btn-new register-btn'
            disabled={isSubmitting}
          >
            register
          </Button>
          {/* links */}
          {/* <div className='links'>
            <Link to='/login' className='link'>
              login
            </Link>
          </div> */}
          {/* end links */}
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
                    handleType(isToggled);
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
              defaultValue='brand'
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
            {isToggled ? 'Register as Customer' : 'Register as Brand'}
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

export default RegisterPage;
