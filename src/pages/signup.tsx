import React, { useEffect, useState } from 'react';
import { SignUpTemplate } from 'templates';
import { SignUpTypes } from 'types';
import { Fetch, StringFunction } from 'libs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [input, setInput] = useState<SignUpTypes.SignUpType>({
    userName: '',
    passWord: '',
    passWordConfirm: '',
    email: '',
  });
  const [helperText, setHelperText] = useState<SignUpTypes.SignUpType>({
    userName: '',
    passWord: '',
    passWordConfirm: '',
    email: '',
  });
  useEffect(() => {
    if (Object.values(helperText).every((value) => value === 'Done')) {
      (async () => {
        const result = await Fetch.fetchPut<SignUpTypes.SignUpType>('/account', input);
        if (result.statusCode === 200) {
          toast.success('Done!');
          router.replace('/auth');
        } else {
          toast.error(result.message);
        }
      })();
    }
  }, [helperText]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setInput({ ...input, [name]: value });
  };
  const onSubmit = () => {
    setHelperText(StringFunction.validateSignUp(input));
  };

  const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSubmit();
  };
  const redirectionPath = '/auth';

  return (
    <SignUpTemplate
      helperText={helperText}
      onChange={onChange}
      onSubmit={onSubmit}
      onPressEnter={onPressEnter}
      redirectionPath={redirectionPath}
    />
  );
}
