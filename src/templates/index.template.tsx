import React from 'react';
import { SideBar, MainContent } from 'organisms';
import { MainTypes } from 'types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow: auto;
`;

export default function IndexTemplate(props: MainTypes.IndexTemplateTypes): JSX.Element {
  const { deviceList,  deviceInformation, deviceData } = props;

  return (
    <Container>
      <SideBar devices={deviceList} />
      {deviceInformation && deviceData ? <MainContent selectedDevice={deviceInformation} deviceData={deviceData} /> : null}
    </Container>
  );
}
