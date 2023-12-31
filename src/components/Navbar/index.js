import React from 'react';
import NavContainer from './styles';
import new_logo from '../../assets/new_logo.png';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { links } from '../../utils/constants';
import CartButtons from '../CartButtons/';
import { useProductsContext } from '../../context/products_context';
import { useUserContext } from '../../context/user_context';

const Nav = () => {
  const { currentUser } = useUserContext();
  const { openSidebar } = useProductsContext();

  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={new_logo} alt='' />
          </Link>
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          {links.map((link) => {
            const { url, text, id } = link;
            return (
              <li key={id}>
                <Link to={url}>
                  {' '}
                  <div className='nav-content'>{text}</div>{' '}
                </Link>
              </li>
            );
          })}
          {currentUser && (
            <li>
              <Link to='/checkout'>
                <div className='nav-content'>checkout</div>
              </Link>
            </li>
          )}
          {currentUser && (
            <li>
              <Link to='/user-dash'>
                <div className='nav-content'>user</div>
              </Link>
            </li>
          )}
          {currentUser && (
            <li>
              <Link to='/dash'>
                <div className='nav-content'>Seller</div>
              </Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

export default Nav;
