import React from 'react';
import { SideBar, MainContent } from 'organisms';
import { ApiTypes, MainTypes } from 'types';
import styled from 'styled-components';

export interface IndexTemplateTypes {
  deviceList: MainTypes.Device[];
  deviceInformation: ApiTypes.DeviceDataType | undefined;
  deviceData: ApiTypes.DataType | undefined;
}

const Container = styled.div`
  display: flex;
  overflow: auto;
`;

export default function IndexTemplate(props: IndexTemplateTypes): JSX.Element {
  const { deviceList, deviceInformation, deviceData } = props;

  return (
    <Container>
      <SideBar devices={deviceList} />
      {deviceInformation && deviceData ? (
        <MainContent selectedDevice={deviceInformation} deviceData={deviceData} />
      ) : null}
    </Container>
  );
}
