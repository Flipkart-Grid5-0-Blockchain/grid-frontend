import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  div {
    min-width: 300px;
  }
  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.25rem;
  }
  .role-picker {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
  }
  .role-text {
    font-size: 20px;
    font-weight: 600;
  }
  .btn-new {
    text-transform: uppercase;
    background: var(--clr-primary-7);
    color: white;
    padding: 0.85rem 0.85rem;
    letter-spacing: var(--spacing);
    display: inline-block;
    font-weight: 400;
    transition: var(--transition);
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius);
    border-color: transparent;
    width: 60%;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form-control {
      margin-bottom: 1.25rem;
      h5 {
        margin-bottom: 0.5rem;
      }
    }
    .input {
      width: 100%;
      padding: 0.5rem;
      background: var(--clr-grey-10);
      border-radius: var(--radius);
      border-color: transparent;
      letter-spacing: var(--spacing);
    }
    .input::placeholder {
      text-transform: capitalize;
    }
    .password {
      display: flex;
      background: var(--clr-grey-10);
      border-radius: var(--radius);
    }
    .togglebtn {
      background: var(--clr-grey-10);
      display: inline-block;
      min-width: min-content;
      margin: 0.5rem;
      border-radius: var(--radius);
    }
    .links {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .link {
      font-size: 1rem;
      font-weight: 500;
      color: var(--clr-primary-6);
      text-transform: capitalize;
    }
    .seperator {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 1.25rem;
      span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.25rem;
        background: white;
      }
      hr {
        width: 100%;
      }
    }
    .register-btn {
      margin-top: 1.25rem;
      width: 60%;
    }
    .google-btn {
      margin-top: 1.25rem;
      width: 60%;
      color: var(--clr-primary-5);
      background: transparent;
      border: 2px solid var(--clr-primary-5);
      &:disabled {
        border: 2px solid var(--clr-primary-8);
        color: var(--clr-primary-8);
      }
      &:disabled:hover {
        color: var(--clr-primary-10);
      }
    }
  }
`;

export default Wrapper;
