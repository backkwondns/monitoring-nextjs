import styled from 'styled-components';

const Button = styled.button`
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background-color: inherit;
  min-height: 2.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.1s ease;

  :hover {
    border-color: #0070f3;
  }

  :active {
    background-color: #0070f3;
    border-color: #0070f3;
    color: #fff;
  }
`;

export default Button;
