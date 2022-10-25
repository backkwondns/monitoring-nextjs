import React, { useState } from 'react';
import styled from 'styled-components';
import Info from 'icons/info.svg';
import { IconButton, DeviceTable, Chart } from 'molecules';
import { OrganismsTypes } from 'types';

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: auto;
  flex-direction: column;
  padding: 10px;
`;
const IconContainer = styled.div`
  border-radius: 10px;
  border: 1px #afafaf solid;
  min-height: 2.5rem;
  overflow: hidden;
  margin-bottom: 5px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  *{
    transition: 0.2s ease-in-out;
  }
`;

export default function MainContent(props: OrganismsTypes.MainContentType): JSX.Element {
  const { selectedDevice, deviceData } = props;
  const [toggleTable, setToggleTable] = useState(false);

  const onClickInfo = () => {
    setToggleTable((prevState) => !prevState);
  };

  const labels = deviceData.map((value) => new Date(value.createdAt).toLocaleTimeString());
  const cpuTemperatureMain = {
    labels,
    datasets: [{ data: deviceData.map((value) => value.cpu.cpuTemperature.main), borderColor: '#ef5350' }],
  };
  const cpuTemperatureMax = {
    labels,
    datasets: [{ data: deviceData.map((value) => value.cpu.cpuTemperature.max), borderColor: '#ef5350' }],
  };
  const cpuCurrentSpeedMin = {
    labels,
    datasets: [{ data: deviceData.map((value) => value.cpu.cpuCurrentSpeed.min), borderColor: '#33c9dc' }],
  };
  const cpuCurrentSpeedAvg = {
    labels,
    datasets: [{ data: deviceData.map((value) => value.cpu.cpuCurrentSpeed.avg), borderColor: '#33c9dc' }],
  };
  const cpuCurrentSpeedMax = {
    labels,
    datasets: [{ data: deviceData.map((value) => value.cpu.cpuCurrentSpeed.max), borderColor: '#33c9dc' }],
  };

  const memActive = {
    labels,
    datasets: [{ data: deviceData.map((value) => value.mem.active), borderColor: '#a2cf6e' }],
  };
  const memAvailable = {
    labels,
    datasets: [{ data: deviceData.map((value) => value.mem.available), borderColor: '#a2cf6e' }],
  };
  return (
    <Container>
      {selectedDevice ? (
        <>
          <IconContainer>
            <IconButton icon={<Info />} name="info" onClick={onClickInfo} />
          </IconContainer>
          <DeviceTable selectedDevice={selectedDevice} toggleTable={toggleTable} />
        </>
      ) : null}
      {deviceData ? (
        <ChartContainer>
          <Chart data={cpuTemperatureMain} title="CPU Temperature Main" />
          <Chart data={cpuTemperatureMax} title="CPU Temperature Max" />
          <Chart data={cpuCurrentSpeedMin} title="CPU CurrentSpeed Min" />
          <Chart data={cpuCurrentSpeedAvg} title="CPU CurrentSpeed Avg" />
          <Chart data={cpuCurrentSpeedMax} title="CPU CurrentSpeed Max" />
          <Chart data={memActive} title="Memory Active" />
          <Chart data={memAvailable} title="Memory Available" />
        </ChartContainer>
      ) : null}
    </Container>
  );
}
