import React from 'react';
import { SideBar, MainContent } from 'organisms';
import { ApiTypes } from 'types';
import styled from 'styled-components';

type Device = { device: string; color: string; client: string };
export interface IndexTemplateTypes {
  deviceList: Device[];
  deviceInformation: ApiTypes.DeviceDataType | undefined;
  deviceData: ApiTypes.DataType | undefined;
}

const Container = styled.div`
  display: flex;
  overflow: auto;
`;
const NonData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export default function IndexTemplate(props: IndexTemplateTypes): JSX.Element {
  const { deviceList, deviceInformation, deviceData } = props;

  return (
    <Container>
      <SideBar devices={deviceList} />
      {deviceInformation && deviceData ? (
        <MainContent selectedDevice={deviceInformation} deviceData={deviceData} />
      ) : (
        <NonData>Please Add Device</NonData>
      )}
    </Container>
  );
}
