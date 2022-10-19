import styled from 'styled-components';

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  div {
    :last-child {
      div {
        border-bottom: none;
      }
    }
  }
`;

export default TableBody;
