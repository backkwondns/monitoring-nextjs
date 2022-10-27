import styled, { css } from 'styled-components';

interface TableCellType {
  data: string;
  // eslint-disable-next-line react/require-default-props
  isColumn?: boolean;
}
const TableData = styled.div`
  ${({ isColumn }: { isColumn: boolean }) => {
    return css`
      background-color: ${isColumn ? '#d5d5d5' : '#fff'};
      width: ${isColumn ? '5rem' : '50%'};
    `;
  }};
  display: flex;
  align-items: center;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  min-width: 6rem;
  overflow: hidden;
`;

const Data = styled.p`
  color: #4e4e4e;
  padding: 0 5px 0 5px;
`;
export default function TableCell(props: TableCellType): JSX.Element {
  const { data, isColumn = false } = props;
  return (
    <TableData isColumn={isColumn}>
      <Data>{data}</Data>
    </TableData>
  );
}
