import React from 'react';
import CustomerReview from '../CustomerReview';
import Updates from '../Updates';
import Wrapper from './styles';

const RightSide = () => {
  return (
    <Wrapper>
      <div className='RightSide'>
        <div>
          <h3>Updates</h3>
          <Updates />
        </div>
        <div>
          <h3>Customer Review</h3>
          <CustomerReview />
        </div>
      </div>
    </Wrapper>
  );
};

export default RightSide;
