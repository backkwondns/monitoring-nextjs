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

type InputType = { userName?: string; passWord?: string; passWordConfirm?: string; email?: string };
export const validateInput = (inputForm: InputType) => {
  const returnForm: InputType = {} as InputType;
  if (inputForm.userName) {
    if (inputForm.userName.length < 4) {
      returnForm.userName = 'Too Short!';
    } else if (inputForm.userName.length > 11) {
      returnForm.userName = 'Too Long!';
    } else {
      returnForm.userName = '';
    }
  }

  if (inputForm.email) {
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(inputForm.email)) {
      returnForm.email = '';
    } else {
      returnForm.email = 'Invalid Input!';
    }
  }
  if (inputForm.passWord) {
    if (inputForm.passWord.length < 7) {
      returnForm.passWord = 'Too Short!';
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(inputForm.passWord)) {
      returnForm.passWord = 'Invalid Input!';
    } else {
      returnForm.passWord = '';
    }
  }
  if (inputForm.passWordConfirm) {
    if (inputForm.passWord !== inputForm.passWordConfirm) {
      returnForm.passWordConfirm = 'Different Password!';
    } else if (inputForm.passWordConfirm.length < 7) {
      returnForm.passWordConfirm = 'Too Short!';
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(inputForm.passWordConfirm)) {
      returnForm.passWordConfirm = 'Invalid Input!';
    } else {
      returnForm.passWordConfirm = '';
    }
  }

  return returnForm;
};
