export type FindAccountType = {
  userName: string;
};
export interface InsertAccountType extends FindAccountType {
  passWord: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
type Token = { refreshToken: string; accessToken: string };
type devices = { device: string; color: string; client: string };
export interface FindAccountResponseType extends InsertAccountType {
  token: Token;
  devices: devices[];
}


export type DataType = {
  _id: string;
  cpu: {
    cpuTemperature: { main: number; max: number; cores: number[] };
    cpuCurrentSpeed: { min: number; max: number; avg: number; cores: number[] };
  };
  mem: { total: number; free: number; used: number; active: number; available: number };
  createdAt: Date;
  client: string;
}[];

type DeviceType = {
  platform: string;
  osVersion: string;
  osName: string;
  hostname: string;
  arch: string;
};

export type DeviceDataType = {
  address: string;
  key: string;
  client: string;
  device: DeviceType;
};

