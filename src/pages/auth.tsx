import React, { useEffect, useState } from 'react';
import { AuthTemplate } from 'templates';
import { AuthTypes } from 'types';
import { Fetch, Storage, StringFunction} from 'libs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
  const router = useRouter();
  const userName = Storage.getItem('userName')
  const [input, setInput] = useState<AuthTypes.AuthType>({ userName: '', passWord: '' });
  const [helperText, setHelperText] = useState<AuthTypes.AuthType>({ userName: '', passWord: '' });

  useEffect(() => {
    if(userName) router.replace('/')
    if (Object.values(helperText).every((value) => value === 'Done')) {
      (async () => {
        const result = await Fetch.fetchPost<AuthTypes.AuthType, AuthTypes.AuthResponseType>('/account', input);
        if (result.statusCode === 200) {
          toast.success('Done!');
          if (result.data) {
            Storage.setItem('accessToken',result.data.accessToken);
            Storage.setItem('userName',input.userName)
            router.push('/');
          }
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
    setHelperText(StringFunction.validateAuth(input));
  };

  const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSubmit();
  };
  const redirectionPath = '/signup';
  return (
    <AuthTemplate
      helperText={helperText}
      onChange={onChange}
      onSubmit={onSubmit}
      onPressEnter={onPressEnter}
      redirectionPath={redirectionPath}
    />
  );
}
