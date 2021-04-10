import styled, { css } from 'styled-components';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & + div {
    margin-top: 10px;
  }
`;

export const Error = styled.div`
  margin-bottom: 10px;
  color: #a53f3f;
`;

export const Literal = styled.div`
  color: #170c3a;
  font-size: 18px;
  margin-bottom: 5px;
`;

export const InputWrapper = styled.div<InputProps>`
  background: #f5f4f6;

  border: 1px solid #ebeaed;
  border-radius: 5px;

  padding: 10px 15px;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 5px;
  }

  input, textarea {
    width: 100%;
    background: #f5f4f6;
    letter-spacing: 0.4px;
    color: #170c3a;
    border: 0;

    resize: none;

    ::placeholder {
      color: #b1adb9;
    }
  }

  ${props =>
    props.isFocused &&
    css`
      background: #ebeaed;
      border: 1px solid #dedce1;

      input,
      textarea {
        background: #ebeaed;
        color: #170c3a;
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      background: #f5f4f6;
      border: 1px solid #ebeaed;

      input,
      textarea {
        background: #f5f4f6;
        color: #170c3a;
        letter-spacing: 0px;
      }
    `}

    ${props =>
      props.isErrored &&
      css`
        background: #feefee;
        border: 1px solid #f95e5a;

        input,
        textarea {
          background: #feefee;
          color: #f95e5a;

          ::placeholder {
            color: #f95e5a;
          }
        }
      `}
`;
