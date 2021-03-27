import React, { useEffect, useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';

// Components
import SampleTokenSend from './components/SampleTokenSend';

const App = () => {
  const [initialToken, setInitialToken] = useState(null);
  const app = useAppBridge();

  const getSessionForConnect = async () => {
    const token: any = await getSessionToken(app);
    setInitialToken(token);
  };

  useEffect(() => {
    getSessionForConnect();
  }, []);

  return (
    initialToken && <SampleTokenSend token={initialToken}></SampleTokenSend>
  );
};

export default App;
