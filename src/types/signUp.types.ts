import React from 'react';

export interface SignUpType {
  userName: string;
  passWord: string;
  passWordConfirm: string;
  email: string;
}

export interface SignUpTemplateType {
  helperText: SignUpType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  redirectionPath: string;
}
export interface SignUpResponseType {
  message: string;
  statusCode: number;
}
