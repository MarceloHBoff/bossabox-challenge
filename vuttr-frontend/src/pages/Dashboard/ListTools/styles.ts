import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const SearchContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  button {
    width: 150px;
    height: 42px;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const CheckBox = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 800px) {
    margin-left: 30px;
  }

  input {
    width: 20px;
    height: 20px;
  }

  span {
    margin-left: 5px;
  }
`;

export const ToolsList = styled.ul`
  margin-top: 20px;
  width: 100%;
  height: 600px;

  overflow-y: auto;
`;

export const Tools = styled.li`
  width: 100%;
  margin-bottom: 15px;
  padding: 20px;
  border: 1px solid #ebeaed;
  border-radius: 5px;
  background: #fcfcfd;
  color: #000;

  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #ebeaed;
  }

  a {
    color: #365df0;
    font-size: 20px;
    text-decoration: underline;
  }

  p {
    font-size: 18px;
    margin: 10px 0;
  }
`;

export const ToolHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ToolHeaderButton = styled.button.attrs({
  type: 'button',
})`
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
