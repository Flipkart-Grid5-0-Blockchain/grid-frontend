import styled from 'styled-components';

const Wrapper = styled.main`
  .top_dash {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 8rem;
  }
  .dashboardSummaryBox2 > a {
    color: white;
    font: 300 1.7rem 'Roboto';
    text-align: center;
    text-decoration: none;
    padding: 1.5rem;
    width: 15vmax;
    height: 10vmax;
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(180deg, #ff919d 0%, #fc929d 100%);
    box-shadow: 0px 10px 20px 0px #e0c6f5;
  }

  .dashboardSummaryBox2 > a:first-child {
    background: linear-gradient(180deg, #ff919d 0%, #fc929d 100%);
    box-shadow: 0px 10px 20px 0px #e0c6f5;
  }

  .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.Mui-selected.css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    font-weight: 500;
    font-size: 1.4rem;
    min-width: 26rem;
  }

  .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    font-weight: 500;
    font-size: 1.4rem;
    min-width: 26rem;
  }

  .bottom {
    border-bottom: 4px solid #aa7a5f;
    width: 47%;
    display: flex;
  }
  .tables_seller {
    width: 100%;
  }
  .headings {
    font-size: 1.3rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 1rem;
    cursor: pointer;
    margin-bottom: 5px;
  }
  .heading_table {
    font-weight: bold;
  }
  @media screen and (max-width: 600px) {
    .dashboardSummaryBox2 > a {
      padding: 0.5rem;
      margin: 1rem;
      font: 300 0.9rem 'Roboto';
    }
  }

  .productListContainer {
    width: 80%;
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0 auto;
  }

  #productListHeading {
    font: 400 2rem 'Roboto';
    padding: 0.5vmax;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.637);
    transition: all 0.5s;
    margin: 2rem;
    text-align: center;
  }

  .productListTable {
    background-color: white;
    border: none !important;
  }

  .productListTable div {
    font: 300 1vmax 'Roboto';
    color: rgba(0, 0, 0, 0.678);
    border: none !important;
  }

  .productListTable a,
  .productListTable button {
    color: rgba(0, 0, 0, 0.527);
    transition: all 0.5s;
  }

  .productListTable a:hover {
    color: #7daeec;
  }

  .productListTable button:hover {
    color: #5595e9;
  }
  .MuiDataGrid-columnHeader {
    background-color: #7daeec;
    padding: 1vmax !important;
  }
  .MuiDataGrid-columnHeader div {
    color: rgb(255, 255, 255);
  }

  @media screen and (max-width: 600px) {
    .productListTable div {
      font: 300 4vw 'Roboto';
    }
  }
`;

export default Wrapper;
