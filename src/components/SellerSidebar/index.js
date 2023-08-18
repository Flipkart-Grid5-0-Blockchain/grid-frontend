import React, { useState } from 'react';
import Wrapper from './styles';
import Logo from '../../assets/logo.png';
import { SidebarData } from '../../Data/Data';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

const SellerSidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: '0',
    },
    false: {
      left: '-60%',
    },
  };
  console.log(window.innerWidth);
  return (
    <Wrapper>
      <div
        className='bars'
        style={expanded ? { left: '60%' } : { left: '5%' }}
        onClick={() => setExpaned(!expanded)}
      >
        {logo}
      </div>
      <motion.div
        className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className='logo'>
          <img src={Logo} alt='logo' />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        <div className='menu'>
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? 'menuItem active' : 'menuItem'}
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className='menuItem'>{logo}</div>
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default SellerSidebar;
