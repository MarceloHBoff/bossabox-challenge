import React from 'react';

import { Container, Tag } from './styles';

interface TagsProps {
  tags: string[];
  filteredTag?: string;
}

const Tags: React.FC<TagsProps> = ({ tags, filteredTag }) => {
  return (
    <Container>
      {tags.map(tag => (
        <Tag key={tag} filtered={tag === filteredTag}>
          #{tag}
        </Tag>
      ))}
    </Container>
  );
};

export default Tags;
