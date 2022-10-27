import React from 'react';
import { Table, TableBody, TableRow, TableCell } from 'atoms';
import { ApiTypes } from 'types';
import styled, { css } from 'styled-components';

export interface DeviceTableType {
  selectedDevice: ApiTypes.DeviceDataType;
  toggleTable: boolean;
}

const Container = styled.div`
  ${({ toggleTable }: { toggleTable: boolean }) => {
    return css`
      margin-bottom: 10px;
      opacity: ${toggleTable ? 1 : 0};
      height: ${toggleTable ? 'auto' : '0px'};
      transform: translateY(${toggleTable ? '10px' : '0px'});
      transition: 0.2s ease-in-out;
    `;
  }}
`;

export default function DeviceTable(props: DeviceTableType): JSX.Element {
  const { selectedDevice, toggleTable } = props;
  return (
    <Container className="Table-Container" toggleTable={toggleTable}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell data="Address" isColumn />
            <TableCell data={selectedDevice.address} />
            <TableCell data="Client" isColumn />
            <TableCell data={selectedDevice.client} />
          </TableRow>
          <TableRow>
            <TableCell data="Key" isColumn />
            <TableCell data={selectedDevice.key} />
            <TableCell data="Platform" isColumn />
            <TableCell data={selectedDevice.device.platform} />
          </TableRow>
          <TableRow>
            <TableCell data="OS" isColumn />
            <TableCell data={selectedDevice.device.osVersion} />
            <TableCell data="OS Name" isColumn />
            <TableCell data={selectedDevice.device.osName} />
          </TableRow>
          <TableRow>
            <TableCell data="HostName" isColumn />
            <TableCell data={selectedDevice.device.hostname} />
            <TableCell data="Arch" isColumn />
            <TableCell data={selectedDevice.device.arch} />
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}
