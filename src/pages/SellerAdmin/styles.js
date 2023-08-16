import styled from 'styled-components';

const Wrapper = styled.section`
  .root {
    /* padding: 0.5rem 3.5rem; */
    color: var(--black);
    ${
      '' /* background: linear-gradient(
      106.37deg,
      #ffe1bc 29.63%,
      #ffcfd1 51.55%,
      #f3c6f1 90.85%
    ); */
    }
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
  }

  .rootGlass {
    display: grid;
    height: 97%;
    width: 97%;
    background: var(--glass);
    border-radius: 2rem;
    gap: 16px;
    grid-template-columns: 11rem auto 20rem;
    overflow: hidden;
  }

  @media screen and (max-width: 1200px) {
    .rootGlass {
      grid-template-columns: 10% 50% auto;
      overflow-y: scroll;
    }
  }

  @media screen and (max-width: 768px) {
    .rootGlass {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;
