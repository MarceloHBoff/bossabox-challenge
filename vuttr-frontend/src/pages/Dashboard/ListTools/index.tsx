import React, { useState, useEffect, ChangeEvent } from 'react';

import { Form } from '@unform/core';

import AddIcon from '../../../assets/icon-add-white.svg';
import DeleteIcon from '../../../assets/icon-delete.svg';
import FavoriteIcon from '../../../assets/icon-favorite.svg';
import SearchIcon from '../../../assets/icon-search.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Tags from '../../../components/Tags';
import { useModal } from '../../../hooks/modal';
import { useTools, Tool } from '../../../hooks/tools';
import api from '../../../services/api';

import AddToolModal from './AddToolModal';
import DeleteToolModal from './DeleteToolModal';
import {
  Container,
  CheckBox,
  SearchContainer,
  SearchWrapper,
  ToolsList,
  Tools,
  ToolHeader,
  ToolHeaderButton,
} from './styles';

let time = 0;

const ListTools: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchByTags, setSearchByTags] = useState(false);

  const { openDeleteModal, setAddModal } = useModal();
  const { tools, setTools } = useTools();

  useEffect(() => {
    async function loadTools() {
      const response = await api.get('/tools');

      setTools(response.data);
    }

    loadTools();
  }, [setTools]);

  async function handleDelete(id: number) {
    await api.delete(`/tools/${id}`);

    setTools(tools.filter(tool => tool.id !== id));
  }

  async function handleClickFavorite(id: number) {
    await api.post(`/favorites/${id}`);
  }

  function handleClickDelete(id: number, title: string) {
    openDeleteModal({ id, title });
  }

  async function handleKeyDownSearch(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchValue(value);

    clearTimeout(time);

    if (value === '') {
      const { data } = await api.get('/tools');

      setTools(data);
      return;
    }

    time = setTimeout(async () => {
      if (value === '') {
        const { data } = await api.get('/tools');

        setTools(data);

        return;
      }

      if (searchByTags) {
        const { data } = await api.get(`/tools?tag=${value}`);

        setTools(data);
      } else {
        const { data } = await api.get('/tools');

        const filteredTools = data.filter((tool: Tool) =>
          tool.title.toUpperCase().includes(value.toUpperCase()),
        );

        setTools(filteredTools);
      }
    }, 500);
  }

  return (
    <Container>
      <SearchContainer>
        <SearchWrapper>
          <Form onSubmit={() => {}}>
            <Input
              name="search"
              icon={SearchIcon}
              value={searchValue}
              onChange={handleKeyDownSearch}
            />
          </Form>
          <CheckBox>
            <input
              type="checkbox"
              onChange={e => setSearchByTags(e.target.checked)}
            />
            <span>Search in tags only</span>
          </CheckBox>
        </SearchWrapper>

        <Button onClick={() => setAddModal(true)}>
          <img src={AddIcon} alt="add" />
          Add
        </Button>
      </SearchContainer>

      <ToolsList>
        {tools.map(({ id, title, link, description, tags }) => (
          <Tools key={id}>
            <ToolHeader>
              <a href={link}>{title}</a>
              <div>
                <ToolHeaderButton onClick={() => handleClickFavorite(id)}>
                  <img src={FavoriteIcon} alt="favortite" />
                  Favorite
                </ToolHeaderButton>
                <ToolHeaderButton onClick={() => handleClickDelete(id, title)}>
                  <img src={DeleteIcon} alt="delete" />
                  Remove
                </ToolHeaderButton>
              </div>
            </ToolHeader>

            <p>{description}</p>

            <Tags tags={tags} filteredTag={searchValue} />
          </Tools>
        ))}
      </ToolsList>
      <DeleteToolModal onConfirm={handleDelete} />
      <AddToolModal />
    </Container>
  );
};

export default ListTools;
