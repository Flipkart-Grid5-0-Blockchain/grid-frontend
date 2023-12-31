import styled from 'styled-components';

const Wrapper = styled.div`
  .CompactCard {
    display: flex;
    flex: 1;
    border-radius: 0.7rem;
    color: white;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-right: 3rem;
    padding-left: 3rem;
    position: relative;
    cursor: pointer;
    background: var(--clr-primary-8);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  }
  .CompactCard:hover {
    box-shadow: none !important;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8) !important;
  }

  .input {
    width: 50%;
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .input::placeholder {
    text-transform: capitalize;
  }

  /* radial bar */
  .radialBar {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;
  }
  .CircularProgressbar {
    width: 4rem !important;
    overflow: visible;
  }
  .CircularProgressbar-path {
    stroke: white !important;
    stroke-width: 12px !important;
    filter: drop-shadow(2px 4px 6px white);
  }
  .CircularProgressbar-trail {
    display: none;
  }
  .CircularProgressbar-text {
    fill: white !important;
  }

  .radialBar > span {
    font-size: 17px;
    font-weight: bold;
  }

  /* sideDetail*/
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  .detail > span:nth-child(1) {
    font-size: 22px;
    font-weight: 600;
  }
  .detail > span:nth-child(2) {
    font-size: 20px;
  }

  /* ExpandedCard */
  .ExpandedCard {
    position: absolute;
    width: 60%;
    height: 70vh;
    z-index: 9;
    left: 13rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
  }
  .ExpandedCard > span:nth-of-type(1) {
    color: white;
    font-size: 26px;
    font-weight: bold;
    text-shadow: 0px 0px 15px white;
  }
  .ExpandedCard > span:nth-of-type(2) {
    color: rgb(236, 236, 236);
    font-size: 15px;
  }

  .chartContainer {
    width: 70%;
  }

  @media screen and (max-width: 1200px) {
    .ExpandedCard {
      top: 2rem;
      height: 45vh;
      left: 6rem;
    }
  }

  @media screen and (max-width: 768px) {
    .ExpandedCard {
      top: 8rem;
      height: 50%;
      left: 25px;
      width: 80%;
    }
  }
`;

export default Wrapper;
