import styled from 'styled-components';

const Wrapper = styled.div`
  .CompactCard {
    display: flex;
    flex: 1;
    border-radius: 0.7rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-right: 3rem;
    padding-left: 3rem;
    position: relative;
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    background: aliceblue;
  }
  .CompactCard:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7) !important;
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

  .btn-container {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    margin-bottom: 0.5rem;
  }

  .text-field {
    font-weight: 700;
    font-size: 1.2rem;
  }

  /* sideDetail*/
  .detail {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .detail > span:nth-child(1) {
    margin-bottom: 0.5rem;
    font-size: 22px;
    font-weight: 600;
    color: black;
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
  .btn a{
    text-decoration: none;
    color: white;
  }
`;

export default Wrapper;
