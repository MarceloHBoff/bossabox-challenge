import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    color: #170c3a;
    font-size: 20px;
    display: block;
    margin-top: 24px;
    transition: color 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const Error = styled.div`
  font-size: 20px;
  color: #cc4c4c;
  margin-top: 24px;
`;
