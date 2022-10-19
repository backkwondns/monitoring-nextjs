import React from 'react';

export interface FormButtonType {
  topButton: string;
  bottomButton: string;
  onClickTop: () => void;
  redirectionPath: string;
}

export interface HelperInputType {
  label: string;
  name: string;
  helperText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IconButtonType {
  icon: JSX.Element;
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SideBarAddContainerType {
  addTrigger: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
export interface ChartType {
  data: { labels: string[]; datasets: { data: number[] }[] };
  title: string;
}
