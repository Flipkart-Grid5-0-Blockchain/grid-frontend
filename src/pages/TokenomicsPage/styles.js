import styled from 'styled-components';

const Wrapper = styled.section`
  // display: grid;
  gap: 4rem;
  p {
    line-height: 2;
    max-width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    color: black;
    font-size: 1.3rem;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }
  .mainp{
    margin-bottom: 2rem;
  }
  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 2.2rem;
  }
  h2{
    font-size: 1.7rem;
  }
  p {
    color: #666;
    line-height: 1.6;
  }
  .highlight {
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
`;

export default Wrapper;
