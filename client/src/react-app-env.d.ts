/// <reference types="react-scripts" />

interface IShop {
  name: string | null;
}

type ShopContextType = {
  shop: IShop;
};
