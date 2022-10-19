import styled, { css } from 'styled-components';
import { MoleculesTypes } from 'types';
import { Button, Input } from 'atoms';

const Container = styled.div`
  ${({ addTrigger }: { addTrigger: boolean }) => {
    return css`
      height: ${addTrigger ? '8rem' : '0px'};
      //display: ${addTrigger ? 'flex' : 'none'};
    `;
  }}
  display:flex;
  flex-direction: column;
  overflow: auto;
  transition: all 0.2s ease-in-out;
`;
const StyledInput = styled(Input)`
  margin: 2px 5px 2px 5px;
  :hover,
  active,
  focus {
    border-color: #07bc0c;
  }

  color: #6e6e6e;
`;

const StyledButton = styled(Button)`
  margin: 5px;
  background-color: #fff;
  height: 1.5rem;
  min-height: 1.5rem;
  :hover {
    border-color: #07bc0c;
  }

  :active {
    background-color: #07bc0c;
    border-color: #07bc0c;
    color: #fff;
  }
`;
export default function SideBarAddContainer(props: MoleculesTypes.SideBarAddContainerType): JSX.Element {
  const { addTrigger, onChange, onSubmit, onPressEnter } = props;
  return (
    <Container addTrigger={addTrigger}>
      <StyledInput placeholder="Address" name="address" onChange={onChange} onKeyPress={onPressEnter} />
      <StyledInput placeholder="Client" name="client" onChange={onChange} onKeyPress={onPressEnter} />
      <StyledInput placeholder="Key" name="key" onChange={onChange} onKeyPress={onPressEnter} />
      <StyledButton onClick={onSubmit}>+</StyledButton>
    </Container>
  );
}
