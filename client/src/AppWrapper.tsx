import { useState, useEffect } from 'react';
import App from './App';
import '@shopify/polaris/dist/styles.css';

// Shopify Config
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

// Context
import { ShopContext } from './contexts/ShopContext';
import useInitialStoreGet from './hooks/useInitialStoreGet';

function AppWrapper() {
  const [shop, setShop] = useState({ name: null });
  const { initialStoreGet } = useInitialStoreGet();

  const getStoreForConnect = async () => {
    setShop(await initialStoreGet());
  };

  useEffect(() => {
    getStoreForConnect();
  }, []);

  const appBridgeConfig: any = {
    apiKey: process.env.REACT_APP_APIKEY,
    shopOrigin: shop.name,
    forceRedirect: false,
  };

  return process.env.REACT_APP_BYPASS === 'true' || shop.name ? (
    <ShopContext.Provider value={{ shop }}>
      <AppProvider i18n={enTranslations}>
        <AppBridgeProvider config={appBridgeConfig}>
          <App />
        </AppBridgeProvider>
      </AppProvider>
    </ShopContext.Provider>
  ) : (
    <p>Loading</p>
  );
}

export default AppWrapper;
