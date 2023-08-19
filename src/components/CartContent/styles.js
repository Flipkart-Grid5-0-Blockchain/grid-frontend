import styled from 'styled-components';

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 5rem;
  }
  .css-1izfg5m {
    background-color: #fff;
    width: 50%;
  }
  .css-19kzrtu {
    padding: 24px;
    border-bottom: 1px solid var(--clr-grey-8);
    border-right: 1px solid var(--clr-grey-8);
    border-left: 1px solid var(--clr-grey-8);
  }

  .instruction {
    font-size: 20px;
  }

  .input {
    width: 60%;
    height: 3rem;
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    margin-right: 1rem;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
  .input::placeholder {
    text-transform: capitalize;
  }

  .output {
    display: flex;
    justify-content: space-between;
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
