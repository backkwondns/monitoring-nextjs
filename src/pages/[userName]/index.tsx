import { IndexTemplate } from 'templates';
import { Fetch } from 'libs';
import { GetServerSidePropsContext } from 'next';
import { ApiTypes } from 'types';
import { GlobalContext } from 'hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Home(props: ApiTypes.FindAccountResponseType): JSX.Element {
  const router = useRouter();
  const { devices } = props;
  const { userName, selectedDevice } = GlobalContext.useGlobalContext();
  const [device, setDevice] = useState<ApiTypes.DeviceDataType>();
  const [deviceData, setDeviceData] = useState<ApiTypes.DataType>();
  useEffect(() => {
    if (selectedDevice) {
      (async () => {
        const result = await Fetch.fetchGet<{ information: ApiTypes.DeviceDataType }>(
          '/resource/init',
          `device=${selectedDevice}`,
        );
        if (result.data) setDevice(result.data.information);
        else {
          toast.error('Error Occurred');
        }
        const resultData = await Fetch.fetchGet<ApiTypes.DataType>('/resource/collect', `device=${selectedDevice}`);
        if (resultData.data) setDeviceData(resultData.data.reverse());
        setInterval(async () => {
          const resultData = await Fetch.fetchGet<ApiTypes.DataType>('/resource/collect', `device=${selectedDevice}`);
          if (resultData.data) setDeviceData(resultData.data.reverse());
        }, 1000);
      })();
    }
  }, [selectedDevice]);

  return <IndexTemplate devices={devices} selectedDevice={device} deviceData={deviceData} />;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userName } = context.query;
  const result = await Fetch.fetchGet<ApiTypes.FindAccountResponseType>('/account', `userName=${userName}`);
  if (result.data) return { props: { devices: result.data.devices } };
  return { props: { devices: [] } };
}
