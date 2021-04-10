import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1);

  min-width: 300px;
  min-height: 100px;

  position: relative;

  animation: in 1s backwards;

  @keyframes in {
    from {
      transform: scale(0.6);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  color: #000;
  top: 0;
  right: 0;

  padding: 15px;

  img {
    width: 22px;
    height: 22px;
  }
`;
