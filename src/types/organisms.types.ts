import React from 'react';
import { ApiTypes } from '.';

export interface FormType<T> {
  helperText: T;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
type device = { device: string; color: string; client: string };

export interface SideBarType {
  devices: device[];
}

export interface SideBarInputType {
  address: string;
  client: string;
  key: string;
}

export interface DeviceTableType {
  selectedDevice: ApiTypes.DeviceDataType;
  toggleTable: boolean;
}

export interface MainContentType {
  selectedDevice: ApiTypes.DeviceDataType;
  deviceData: ApiTypes.DataType;
}
