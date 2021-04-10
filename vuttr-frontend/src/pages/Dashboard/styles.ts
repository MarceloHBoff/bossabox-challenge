import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  padding: 20px;
  padding-top: 80px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Title = styled.div`
  margin-bottom: 20px;

  h2 {
    margin: 10px 0;
  }
`;

export const Tabs = styled.div`
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #8f8a9b;
`;

interface TabProps {
  selected?: boolean;
}

export const Tab = styled.span<TabProps>`
  font-size: 20px;
  font-weight: bold;
  color: #8f8a9b;
  padding: 5px 10px;
  padding-bottom: 10px;

  border-bottom: 1px solid #8f8a9b;
  cursor: pointer;

  & + span {
    margin-left: 30px;
  }

  ${props =>
    props.selected &&
    css`
      color: #365df0;
      border-bottom: 3px solid #365df0;
    `}
`;
