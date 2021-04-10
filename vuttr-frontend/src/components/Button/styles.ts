import styled from 'styled-components';

export const Container = styled.button`
  background: #365df0;
  height: 50px;
  border-radius: 5px;
  padding: 14px 26px;
  color: #fff;
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: #2f55cc;
  }

  &:active {
    background: #244aa8;
  }

  &:disabled {
    background: #b9c6fa;
    color: #e1e7fd;
  }
`;
