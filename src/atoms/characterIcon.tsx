import React from 'react';
import styled, { css } from 'styled-components';

interface CharacterIconType {
  text: string;
  color: string;
}
const Icon = styled.div`
  ${({ color }: { color: string }) => {
    return css`
      background-color: ${`#${color}`};
    `;
  }}
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  color: black;
`;
export default function CharacterIcon(props: CharacterIconType): JSX.Element {
  const { text, color } = props;
  return <Icon color={color}>{text.charAt(0).toUpperCase()}</Icon>;
}
