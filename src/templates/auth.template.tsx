import { FormButton } from 'molecules';
import { Form } from 'organisms';
import styled from 'styled-components';
import { AuthTypes } from 'types';

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

export default function AuthTemplate(props: AuthTypes.AuthTemplateType): JSX.Element {
  const { helperText, onChange, onSubmit, onPressEnter, redirectionPath } = props;
  return (
    <Container>
      <Form<AuthTypes.AuthType> onChange={onChange} onPressEnter={onPressEnter} helperText={helperText} />
      <FormButton topButton="Login" bottomButton="Sign Up" onClickTop={onSubmit} redirectionPath={redirectionPath} />
    </Container>
  );
}
