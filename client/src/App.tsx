import { useEffect, useState } from 'react';
import useAuthenticatedHttp from './hooks/useAuthenticatedHttp';

// Context
import { ShopContext } from './contexts/ShopContext';

// Pages
import Home from './pages/Home';

const App = () => {
  const [shop, setShop] = useState({ name: null });
  const { authenticatedGet } = useAuthenticatedHttp();

  const getStoreForConnect = async () => {
    setShop(await authenticatedGet('/api/shop'));
  };

  useEffect(() => {
    getStoreForConnect();
  }, []);

  return process.env.REACT_APP_BYPASS === 'true' || shop.name ? (
    <ShopContext.Provider value={{ shop }}>
      <Home test={'TEST'} />
    </ShopContext.Provider>
  ) : (
    <p>LOADING</p>
  );
};

// TODO: Build a loading system

export default App;
