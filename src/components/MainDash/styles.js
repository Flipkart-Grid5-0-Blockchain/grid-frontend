import styled from 'styled-components';

const NavContainer = styled.nav`
  .MainDash {
    /* padding-top: 1rem; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  @media screen and (max-width: 1200px) {
    .MainDash {
      justify-content: flex-start;
      margin-top: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    .MainDash {
      align-items: center;
    }
  }
`;

export default NavContainer;
