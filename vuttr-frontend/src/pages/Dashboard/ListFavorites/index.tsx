import React, { useState, useEffect } from 'react';

import DeleteIcon from '../../../assets/icon-delete.svg';
import Tags from '../../../components/Tags';
import api from '../../../services/api';
import {
  ToolsList,
  ToolHeader,
  ToolHeaderButton,
  Tools,
} from '../ListTools/styles';

import { Container } from './styles';

interface FavoriteTool {
  id: number;
  tool: {
    id: number;
    title: string;
    link: string;
    description: string;
    tags: string[];
  };
}

const ListFavorites: React.FC = () => {
  const [favoritesTools, setFavoritiesTools] = useState<FavoriteTool[]>([]);

  useEffect(() => {
    async function loadFavoritesTools() {
      const response = await api.get('/favorites');

      setFavoritiesTools(response.data);
    }

    loadFavoritesTools();
  }, []);

  async function handleClickFavorite(id: number) {
    await api.delete(`/favorites/${id}`);

    setFavoritiesTools(favoritesTools.filter(fav => fav.id !== id));
  }

  return (
    <Container>
      <ToolsList>
        {favoritesTools.map(({ id, tool }) => (
          <Tools key={id}>
            <ToolHeader>
              <a href={tool.link}>{tool.title}</a>
              <ToolHeaderButton onClick={() => handleClickFavorite(id)}>
                <img src={DeleteIcon} alt="delete" />
                Remove
              </ToolHeaderButton>
            </ToolHeader>

            <p>{tool.description}</p>

            <Tags tags={tool.tags} />
          </Tools>
        ))}
      </ToolsList>
    </Container>
  );
};

export default ListFavorites;
