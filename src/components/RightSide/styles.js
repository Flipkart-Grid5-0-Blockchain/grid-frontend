import styled from 'styled-components';

const Wrapper = styled.div`
  .RightSide {
    display: flex;
    flex-direction: column;
    /* padding-top: 1rem; */
    width: 95%;
    justify-content: space-evenly;
  }

  @media screen and (max-width: 1200px) {
    .RightSide {
      justify-content: flex-start;
      margin-top: 3rem;
    }
  }

  @media screen and (max-width: 768px) {
    .RightSide {
      width: 100%;
      margin-top: 0;
    }
    .RightSide > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default Wrapper;