import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

interface TagProps {
  filtered?: boolean;
}

export const Tag = styled.div<TagProps>`
  margin-right: 10px;
  font-weight: bold;

  ${props =>
    props.filtered &&
    css`
      background: #ffbb43;
    `};
`;
