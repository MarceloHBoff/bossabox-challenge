import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';

import { Container, Literal, InputWrapper, Error } from './styles';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  name: string;
  icon?: string;
  literal?: string;
  textarea?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  icon,
  literal,
  textarea,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { defaultValue, error, fieldName, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (textarea) {
      setIsFilled(!!textareaRef.current?.value);
    } else {
      setIsFilled(!!inputRef.current?.value);
    }
  }, [textarea]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textarea ? textareaRef.current : inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, textarea]);

  return (
    <>
      <Container>
        <Literal>{literal}</Literal>

        <InputWrapper
          isFocused={isFocused}
          isFilled={isFilled}
          isErrored={!!error}
        >
          {icon && <img src={icon} alt={name} />}

          {textarea ? (
            <textarea
              cols={30}
              rows={10}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              defaultValue={defaultValue}
              ref={textareaRef}
              autoComplete="off"
              {...rest}
            />
          ) : (
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              defaultValue={defaultValue}
              ref={inputRef}
              autoComplete="off"
              {...rest}
            />
          )}
        </InputWrapper>
      </Container>

      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
