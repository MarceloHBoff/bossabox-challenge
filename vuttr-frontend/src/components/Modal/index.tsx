import React from 'react';

import CloseIcon from '../../assets/icon-close.svg';
import { useModal } from '../../hooks/modal';

import { Container, ModalContainer, CloseButton } from './styles';

const Modal: React.FC = ({ children }) => {
  const { setDeleteModal, setAddModal } = useModal();

  function handleClose() {
    setDeleteModal(false);
    setAddModal(false);
  }

  return (
    <Container>
      <ModalContainer>
        <CloseButton onClick={handleClose}>
          <img src={CloseIcon} alt="close" />
        </CloseButton>

        {children}
      </ModalContainer>
    </Container>
  );
};

export default Modal;
