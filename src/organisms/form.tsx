import styled from 'styled-components';
import { HelperInput } from 'molecules';
import React from 'react';

interface FormType<T> {
  helperText: T;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
`;

export default function Form<T>(props: FormType<T>): JSX.Element {
  const { helperText, onChange, onPressEnter } = props;
  return (
    <Container>
      {Object.keys(helperText).map((field, index) => {
        const helper = Object.values(helperText)[index] || '';
        return (
          <HelperInput
            key={field}
            label={field.toUpperCase()}
            name={field}
            onChange={onChange}
            helperText={helper}
            onPressEnter={onPressEnter}
          />
        );
      })}
    </Container>
  );
}
