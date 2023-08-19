import styled from 'styled-components';

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
  .css-1izfg5m {
    background-color: #fff;
    width: 80%;
    margin-left: 10%;
  }
  .css-19kzrtu {
    padding: 24px;
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-left: 1px solid;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
  .highlight {
    border-bottom: 4px solid blue;
  }
`;

export default Wrapper;
