import React from 'react';
import styled from 'styled-components';
import { Button } from 'atoms';
import Link from 'next/link';

interface FormButtonType {
  topButton: string;
  bottomButton: string;
  onClickTop: () => void;
  redirectionPath: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
`;

export default function FormButton(props: FormButtonType): JSX.Element {
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
