import styled from 'styled-components';

const Wrapper = styled.section`
  border: 1px solid var(--clr-grey-8);
  border-radius: 7px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  .input {
    width: 45%;
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .input::placeholder {
    text-transform: capitalize;
  }
  .inputs {
    display: flex;
    justify-content: space-between;
  }
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  @media only screen and (max-width: 400px) {
    article {
      padding: 1.5rem 0.5rem;
    }
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    width: 100%;
    align-items: center;
  }
  @media (min-width: 776px) {
    justify-content: center;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default Wrapper;
