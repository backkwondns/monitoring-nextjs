import { FormButton } from 'molecules';
import { Form } from 'organisms';
import styled from 'styled-components';
import { AuthTypes } from 'types';
import React from "react";
import {AuthType} from "types/auth.types";

interface AuthTemplateType {
  helperText: AuthType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  redirectionPath: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  height: 100vh;
  * {
    width: 100%;
    margin: 5px;
  }
`;

export default function AuthTemplate(props: AuthTemplateType): JSX.Element {
  const { helperText, onChange, onSubmit, onPressEnter, redirectionPath } = props;
  return (
    <Container>
      <Form<AuthTypes.AuthType> onChange={onChange} onPressEnter={onPressEnter} helperText={helperText} />
      <FormButton topButton="Login" bottomButton="Sign Up" onClickTop={onSubmit} redirectionPath={redirectionPath} />
    </Container>
  );
}
