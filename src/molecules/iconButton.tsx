import { Button } from 'atoms';
import styled from 'styled-components';
import React from 'react';

interface IconButtonType {
  icon: JSX.Element;
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  border: none;
  border-radius: 0;
  padding: 0;
  margin: 0;

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
export default function IconButton(props: IconButtonType): JSX.Element {
  const { icon, name, onClick } = props;
  return (
    <StyledButton name={name} onClick={onClick}>
      {icon}
    </StyledButton>
  );
}
