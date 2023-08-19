import React, { useState } from 'react';
import Wrapper from './styles';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

// parent Card

const Card = (props) => {
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
    <div className='CompactCard' layoutId='expandableCard'>
      <div className='detail'>
        <span>{param.title}</span>
        {param.type === 0 ? (
          <span>${param.value}</span>
        ) : (
          <span>
            <input placeholder='Address'></input>
            <button>Send</button>
          </span>
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

export default Card;
