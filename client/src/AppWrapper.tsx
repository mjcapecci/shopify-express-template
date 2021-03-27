import React from 'react';
import App from './App';
import '@shopify/polaris/dist/styles.css';

// Shopify Config
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

const appBridgeConfig: any = {
  apiKey: process.env.REACT_APP_APIKEY,
  shopOrigin: 'frontierdevs-test-store.myshopify.com',
  forceRedirect: false,
};

function AppWrapper() {
  return (
    <AppProvider i18n={enTranslations}>
      <AppBridgeProvider config={appBridgeConfig}>
        <App></App>
      </AppBridgeProvider>
    </AppProvider>
  );
}

export default AppWrapper;
