import React from 'react';
import Wrapper from './styles';

const CartColumns = () => {
  return (
    <Wrapper>
      <div className='content'>
        <h3>item</h3>
        <h3>price</h3>
        <h3>quantity</h3>
        <h3>subtotal</h3>
        <span></span>
      </div>
    </Wrapper>
  );
};

export default CartColumns;
