import React, { useState } from 'react';
import Wrapper from './styles';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// parent Card

const GiftCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

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
    <div className='CompactCard' layoutId='expandableCard'>
      <div className='detail'>
        <div className='text-field'>{param.company}</div>
        <div className='btn-container'>
          <div className='text-field'>{param.title}: </div>
          <div className='text-field'>{param.value}</div>
        </div>
        <div className='btn'>
          <Link to='/products'>Redeem</Link>
        </div>
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
