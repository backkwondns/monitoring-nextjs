import { IndexTemplate } from 'templates';
import { Fetch, Storage } from 'libs';
import { ApiTypes, MainTypes } from 'types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalContext } from 'hooks';

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default function Home(): JSX.Element {
  const userName = Storage.getItem('userName');
  const { selectedDevice, setSelectedDevice } = GlobalContext.useGlobalContext();
  const [deviceList, setDeviceList] = useState<MainTypes.Device[]>();
  const [deviceInformation, setDeviceInformation] = useState<ApiTypes.DeviceDataType>();
  const [deviceData, setDeviceData] = useState<ApiTypes.DataType>();
  useEffect(() => {
    Fetch.fetchGet<ApiTypes.FindAccountResponseType>('/account', `userName=${userName}`)
      .then((value) => {
        if (value.data) {
          setDeviceList(value.data.devices);
          setSelectedDevice(value.data.devices[0].device);
        }
      })
      // .catch((value) => {
      //   toast.error('Login Again!');
      //   router.push('/auth');
      // });
    if (selectedDevice) {
      Fetch.fetchGet<{ information: ApiTypes.DeviceDataType }>('/resource/init', `device=${selectedDevice}`).then(
        (value) => {
          if (value.data) setDeviceInformation(value.data?.information);
        },
      );
      Fetch.fetchGet<ApiTypes.DataType>('/resource/collect', `device=${selectedDevice}`).then((value) => {
        if (value.data) setDeviceData(value.data.reverse());
      });
      setInterval(() => {
        Fetch.fetchGet<ApiTypes.DataType>('/resource/collect', `device=${selectedDevice}`).then((value) => {
          if (value.data) setDeviceData(value.data.reverse());
        });
      }, 10000);
    }
  }, [selectedDevice]);
  if (deviceList)
    return <IndexTemplate deviceList={deviceList} deviceInformation={deviceInformation} deviceData={deviceData} />;
  return <Loading>Loading...</Loading>;
}
