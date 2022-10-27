import { AuthTypes, SignUpTypes } from 'types';

const validateUserName = (value: string): string => {
  if (value.length < 5) {
    return 'UserName Must be at least 5 characters';
  }
  if (value.length > 13) {
    return 'Maximum UserName Length is 12 characters';
  }
  return 'Done';
};
const validateEmail = (value: string): string => {
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
    return 'Done';
  }
  return 'Invalid Email!';
};
const validatePassWord = (value: string): string => {
  if (value.length < 7) {
    return 'PassWord Must be at least 8 characters';
  }
  if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)) {
    return 'PassWord must Include special character and number';
  }
  return 'Done';
};

const validatePassWordConfirm = (passWord: string, passWordConfirm: string): string => {
  const validate = validatePassWord(passWordConfirm);
  if (validate === 'Done') {
    if (passWord === passWordConfirm) return 'Done';
  } else {
    return validate;
  }
  return 'Different PassWord!';
};

export const validateAuth = (input: AuthTypes.AuthType): AuthTypes.AuthType => {
  const helperText: AuthTypes.AuthType = {} as AuthTypes.AuthType;
  helperText.userName = validateUserName(input.userName);
  helperText.passWord = validatePassWord(input.passWord);
  return helperText;
};

export const validateSignUp = (input: SignUpTypes.SignUpType): SignUpTypes.SignUpType => {
  const helperText: SignUpTypes.SignUpType = {} as SignUpTypes.SignUpType;
  helperText.userName = validateUserName(input.userName);
  helperText.passWord = validatePassWord(input.passWord);
  helperText.passWordConfirm = validatePassWordConfirm(input.passWord, input.passWordConfirm);
  helperText.email = validateEmail(input.email);
  return helperText;
};
