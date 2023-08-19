import React from 'react';
import Wrapper from './styles';
import { SellerSidebar, MainDash, RightSide } from '../../components';

const SellerAdmin = () => {
  return (
    <Wrapper>
      <div className='root'>
        <div className='rootGlass'>
          <SellerSidebar />
          <MainDash />
          <RightSide />
        </div>
      </div>
    </Wrapper>
  );
};

export default SellerAdmin;
