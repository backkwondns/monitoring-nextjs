import React from 'react';
import styled from 'styled-components';
import { Button } from 'atoms';
import { MoleculesTypes } from 'types';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
`;

export default function FormButton(props: MoleculesTypes.FormButtonType): JSX.Element {
  const { topButton, bottomButton, onClickTop, redirectionPath } = props;
  return (
    <Container>
      <Button onClick={onClickTop}>{topButton}</Button>
      <Link href={redirectionPath}>
        <Button>{bottomButton}</Button>
      </Link>
    </Container>
  );
}
