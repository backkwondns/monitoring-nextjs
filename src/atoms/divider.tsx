import styled, { css } from 'styled-components';

const Divider = styled.div`
  ${({ weight = 'none' }: { weight?: 'none' | 'thick' }) => {
    return css`
      width: 100%;
      border-bottom: solid #eaeaea ${weight === 'thick' ? '3px' : '1px'};
    `;
  }}
`;

export default Divider;
