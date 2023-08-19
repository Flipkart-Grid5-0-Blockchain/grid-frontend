import React, { useState } from 'react';
import Wrapper from './styles';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { Button } from '@material-ui/core';
import styled from 'styled-components';


// parent Card

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const GiftCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Wrapper>
      <AnimateSharedLayout>
        {expanded ? (
          <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
        ) : (
          <CompactCard param={props} setExpanded={() => setExpanded(true)} />
        )}
      </AnimateSharedLayout>
    </Wrapper>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  return (
    <div
      className='CompactCard'
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId='expandableCard'
    >
      <div className='detail'>
        <span>{param.title}</span>
        {param.type == 0 ? (
          <span>${param.value}</span>
        ) : (
          <BootstrapButton variant='contained' disableRipple>
            Send
          </BootstrapButton>
        )}
      </div>
    </div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  return (
    <motion.div
      className='ExpandedCard'
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId='expandableCard'
    >
      <span>{param.title}</span>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default GiftCard;
