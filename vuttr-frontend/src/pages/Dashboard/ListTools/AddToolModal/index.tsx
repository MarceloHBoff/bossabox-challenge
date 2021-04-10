import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import AddIcon from '../../../../assets/icon-add.svg';
import Input from '../../../../components/Input';
import Modal from '../../../../components/Modal';
import { useModal } from '../../../../hooks/modal';
import { useTools } from '../../../../hooks/tools';
import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { Container, Title, Footer, AddToolButton } from './styles';

interface SignInFormData {
  title: string;
  link: string;
  description: string;
  tags: string;
}

const AddToolModal: React.FC = () => {
  const { addModal, setAddModal } = useModal();
  const { setTools } = useTools();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Title is required'),
          link: Yup.string().required('Link is required'),
          description: Yup.string().required('Description is required'),
          tags: Yup.string().required('Tags is required'),
        });

        await schema.validate(data, { abortEarly: false });

        setAddModal(false);

        const newToolData = {
          ...data,
          tags: data.tags.split(',').map(tag => tag.trim()),
        };

        const response = await api.post('/tools', newToolData);

        setTools(state => [...state, response.data]);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [setAddModal, setTools],
  );

  if (!addModal) return null;

  return (
    <Modal>
      <Container>
        <Title>
          <img src={AddIcon} alt="add" />
          Add new tool
        </Title>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="title" literal="Tool name" />
          <Input name="link" literal="Tool link" />
          <Input name="description" literal="Tool description" textarea />
          <Input name="tags" literal="Tags" />

          <Footer>
            <AddToolButton type="submit">Add tool</AddToolButton>
          </Footer>
        </Form>
      </Container>
    </Modal>
  );
};

export default AddToolModal;
