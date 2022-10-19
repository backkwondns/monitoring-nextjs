import { ApiTypes } from '.';

type device = { device: string; color: string; client: string };
export interface IndexTemplateTypes {
  devices: device[];
  selectedDevice?: ApiTypes.DeviceDataType;
  deviceData?: ApiTypes.DataType;
}
