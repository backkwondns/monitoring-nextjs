import { FormButton } from 'molecules';
import { Form } from 'organisms';
import styled from 'styled-components';
import { SignUpTypes } from 'types';

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

export default function SignUpTemplate(props: SignUpTypes.SignUpTemplateType): JSX.Element {
  const { helperText, onChange, onSubmit, onPressEnter, redirectionPath } = props;
  return (
    <Container>
      <Form<SignUpTypes.SignUpType> onChange={onChange} helperText={helperText} onPressEnter={onPressEnter} />
      <FormButton topButton="Sign Up" bottomButton="Back" onClickTop={onSubmit} redirectionPath={redirectionPath} />
    </Container>
  );
}
