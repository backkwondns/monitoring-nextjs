import styled from 'styled-components';

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid #eaeaea;
  color: inherit;
  min-height: 1.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease-in-out;

  :hover,
  :active,
  :focus {
    border-color: #0070f3;
  }
  :focus::placeholder {
    color: transparent;
  }
`;

export default Input;
