import React from 'react';
import { SideBar, MainContent } from 'organisms';
import { IndexTypes } from 'types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow: auto;
`;

export default function IndexTemplate(props: IndexTypes.IndexTemplateTypes): JSX.Element {
  const { devices, selectedDevice, deviceData } = props;

  return (
    <Container>
      <SideBar devices={devices} />
      {selectedDevice && deviceData ? <MainContent selectedDevice={selectedDevice} deviceData={deviceData} /> : null}
    </Container>
  );
}
