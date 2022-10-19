import React from 'react';

export interface AuthType {
  userName: string;
  passWord: string;
}

export interface AuthResponseType {
  userName: string;
  accessToken: string;
}
export interface AuthTemplateType {
  helperText: AuthType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  redirectionPath: string;
}
