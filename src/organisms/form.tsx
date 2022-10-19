import styled from 'styled-components';
import { OrganismsTypes } from 'types';
import { HelperInput } from 'molecules';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
`;

export default function Form<T>(props: OrganismsTypes.FormType<T>): JSX.Element {
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
