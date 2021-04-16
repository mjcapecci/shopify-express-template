import { createContext, useContext } from 'react';

export const ShopContext = createContext<ShopContextType>({
  shop: { name: null },
});

export const useShop = () => useContext(ShopContext);
