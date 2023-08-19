import styled from 'styled-components';

const Wrapper = styled.article`
  .Updates {
    width: 85%;
    background: white;
    border-radius: 0.7rem;
    padding: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    font-size: 13px;
  }

  .update {
    display: flex;
    gap: 0.5rem;
  }

  .update > img {
    width: 3.2rem;
    height: 3.2rem;
  }

  .noti > div > span:nth-of-type(1) {
    font-weight: bold;
  }
`;

export default Wrapper;
