import React, { useEffect } from 'react';
import Wrapper from './styles';
import { PageHero } from '../../components';
import aboutImg from '../../assets/hero-bcg.jpeg';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'Smartkart | About';
  }, []);

  return (
    <main>
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='pic' />
        <article>
          <div className='title'>
            <h2>Our Story</h2>
            <div className='underline'></div>
          </div>
          <p>
            SmartCart is an innovative e-commerce platform built on Web3
            technology, offering users a seamless and secure shopping
            experience. By integrating blockchain and decentralized features,
            SmartCart ensures transparent transactions, data privacy, and
            efficient inventory management, revolutionizing the way online
            shopping is conducted while prioritizing user trust and convenience.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

export default AboutPage;
