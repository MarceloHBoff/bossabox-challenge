import React from 'react';

import DeleteIcon from '../../../../assets/icon-delete.svg';
import Modal from '../../../../components/Modal';
import { useModal } from '../../../../hooks/modal';

import { Container, Title, Footer, CancelButton, YesButton } from './styles';

interface DeleteToolModalProps {
  onConfirm(id: number): Promise<void>;
}

const DeleteToolModal: React.FC<DeleteToolModalProps> = ({ onConfirm }) => {
  const { deleteModal, setDeleteModal, deleteData } = useModal();

  function handleConfirm(id: number) {
    setDeleteModal(false);

    onConfirm(id);
  }

  if (!deleteModal) return null;

  return (
    <Modal>
      <Container>
        <Title>
          <img src={DeleteIcon} alt="add" />
          Remove tool
        </Title>
        <p>
          {'Are you sure you want to remove '}
          <strong>{deleteData.title}</strong>?
        </p>
        <Footer>
          <CancelButton onClick={() => setDeleteModal(false)}>
            Cancel
          </CancelButton>
          <YesButton onClick={() => handleConfirm(deleteData.id)}>
            Yes, remove
          </YesButton>
        </Footer>
      </Container>
    </Modal>
  );
};

export default DeleteToolModal;
