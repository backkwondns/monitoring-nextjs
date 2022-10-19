import { GlobalContext } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { userName } = GlobalContext.useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    router.replace(userName);
  }, []);
}
