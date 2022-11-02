import { IndexTemplate } from 'templates';
import { Fetch, Storage } from 'libs';
import { ApiTypes } from 'types';
import { useEffect, useState } from 'react';
import { GlobalContext } from 'hooks';

export default function Home(): JSX.Element {
  const userName = Storage.getItem('userName');
  const { deviceList, setDeviceList, selectedDevice, setSelectedDevice } = GlobalContext.useGlobalContext();
  const [deviceInformation, setDeviceInformation] = useState<ApiTypes.DeviceDataType>();
  const [deviceData, setDeviceData] = useState<ApiTypes.DataType>();
  useEffect(() => {
    Fetch.fetchGet<ApiTypes.FindAccountResponseType>('/account', `userName=${userName}`).then((value) => {
      if (value.data) {
        if (value.data.devices) {
          setDeviceList(value.data.devices);
          setSelectedDevice(value.data.devices[0].device);
        }
      }
    });
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
  return <IndexTemplate deviceList={deviceList} deviceInformation={deviceInformation} deviceData={deviceData} />;
}
