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
        <div class='container'>
          <h1>Tokenomics: SmartkartCoin</h1>
          <p className='mainp'>
            We present a comprehensive tokenomics framework for SmartkartCoin, a
            digital token designed to revolutionize the e-commerce landscape,
            enhancing user engagement, loyalty, and brand interactions. The
            following structured breakdown elucidates the key components of the
            SmartkartCoin ecosystem:
          </p>
          {/* <!-- Market Overview --> */}
          <div class='highlight'>
            <h2>Market Overview</h2>
            <p>
              Average Order Value: Rs. 2000-3000
              <br />
              Monthly Active Users: 200 million
              <br />
              Projected Annual Revenue (2022): Rs. 511 billion
              <br />
              Per-Person Order Value: Rs. 2551
            </p>
          </div>
          {/* <!-- Coin Cap --> */}
          <div class='highlight'>
            <h2>Coin Cap</h2>
            <p>
              Initial Coin Cap: 10^10 tokens (can be changed)
              <br />
              Calculated from 20 crore users generating Rs. 2500 average order
              value
              <br />
              2% of total equals 10^10 tokens (Rs. 1000 crore)
            </p>
          </div>
          {/* <!-- Token Expiry and Per-person Order Value --> */}
          <div class='highlight'>
            <h2>Token Expiry and Per-person Order Value</h2>
            <p>
              Tokens valid for 6 months
              <br />
              Per-person order value in 6 months: Rs. 1275
            </p>
          </div>
          {/* <!-- Token Distribution --> */}
          <div class='highlight'>
            <h2>Token Distribution</h2>
            <p>
              Users receive 2% of purchase amount in tokens
              <br />
              Brands receive 1% of purchase amount in tokens
            </p>
          </div>
          {/* <!-- Token Valuation --> */}
          <div class='highlight'>
            <h2>Token Valuation</h2>
            <p>1 token = 1 Indian rupee</p>
          </div>
          {/* <!-- Redemption Token Cap --> */}
          <div class='highlight'>
            <h2>Redemption Token Cap</h2>
            <p>Token redemption capped at 10% of order amount</p>
          </div>
          {/* <!-- Monthly Token Limit --> */}
          <div class='highlight'>
            <h2>Monthly Token Limit</h2>
            <p>
              Users cannot receive more than order_numbers * 100 tokens per
              month
            </p>
          </div>
          {/* <!-- Referral Program --> */}
          <div class='highlight'>
            <h2>Referral Program</h2>
            <p>
              Referrer Reward: 100 tokens
              <br />
              Referred User Reward: 100 tokens
            </p>
          </div>
          {/* <!-- Reviews and Engagement --> */}
          <div class='highlight'>
            <h2>Reviews and Engagement</h2>
            <p>
              Users whose reviews are published receive 5 tokens
              <br />
              To be published, a review must meet certain upvote and downvote
              criteria
            </p>
          </div>
          <p>
            SmartkartCoin's tokenomics framework is poised to
            revolutionize e-commerce engagement by incentivizing users,
            rewarding brand loyalty, and fostering meaningful interactions. By
            structuring rewards around orders, referrals, and reviews, the
            ecosystem creates a dynamic, engaging, and lucrative environment for
            all stakeholders. As e-commerce pioneers, Smartkart's innovative
            approach promises to reshape the industry's landscape while
            amplifying user experiences and brand affinity.
          </p>
        </div>
      </Wrapper>
    </main>
  );
};

export default AboutPage;
