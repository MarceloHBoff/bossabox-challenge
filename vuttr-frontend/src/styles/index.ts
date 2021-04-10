import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #fff;
    color: #170C3A;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea,  button {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
    border: 0;
    background: none;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export const AppContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;

  max-width: 980px;
`;
