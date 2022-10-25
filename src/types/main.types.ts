import { ApiTypes } from '.';

export type Device = { device: string; color: string; client: string };
export interface IndexTemplateTypes {
  deviceList: Device[];
  deviceInformation: ApiTypes.DeviceDataType | undefined;
  deviceData: ApiTypes.DataType | undefined;
}

export interface DevicePageTypes{
  userName: string;
  device: string;
}
