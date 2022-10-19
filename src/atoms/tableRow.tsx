import styled from 'styled-components';

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  div {
    :last-child {
      border-right: none;
    }
  }
`;

export default TableRow;
