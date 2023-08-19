import React from 'react';
import Wrapper from './styles.js';
import { cardsData } from '../../Data/Data.js';

import Card from '../Card';

const Cards = () => {
  return (
    <Wrapper>
      <div className='Cards'>
        {cardsData.map((card, id) => {
          return (
            <div className='parentContainer' key={id}>
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Cards;
