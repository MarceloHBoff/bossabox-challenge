import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 400px;

  p,
  span {
    color: #000;
  }

  span + span {
    margin-top: 15px;
  }
`;

export const Title = styled.div`
  color: #000;
  margin-bottom: 20px;

  display: flex;
  align-items: center;

  img {
    color: #000;
    margin-right: 10px;
    width: 22px;
    height: 22px;

    svg {
      color: #000;
    }
  }
`;

export const AddToolButton = styled.button`
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  background: #365df0;
  border: 1px solid #365df0;

  margin-left: 20px;

  &:hover {
    border: 1px solid #2f55cc;
    background: #2f55cc;
  }

  &:active {
    border: 1px solid #244aa8;
    background: #244aa8;
  }
`;

export const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;
