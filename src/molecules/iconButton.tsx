import { Button } from 'atoms';
import { MoleculesTypes } from 'types';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  border: none;
  border-radius: 0px;
  padding: 0px;
  margin: 0px;

  svg {
    fill: #eaeaea;
    :hover {
      fill: #afafaf;
    }
  }

  :hover {
    svg {
      fill: #afafaf;
    }
  }

  :active {
    background-color: #eaeaea;
  }
`;
export default function IconButton(props: MoleculesTypes.IconButtonType): JSX.Element {
  const { icon, name, onClick } = props;
  return (
    <StyledButton name={name} onClick={onClick}>
      {icon}
    </StyledButton>
  );
}
