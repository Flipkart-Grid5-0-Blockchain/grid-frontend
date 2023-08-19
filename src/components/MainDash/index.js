import React from 'react';
import Cards from '../Cards';
import Table from '../Table';
import Wrapper from './styles';
const MainDash = () => {
  return (
    <Wrapper>
      <div className='MainDash'>
        <h1>Dashboard</h1>
        <Cards />
        <Table />
      </div>
    </Wrapper>
  );
};

export default MainDash;
