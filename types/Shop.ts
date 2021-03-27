export interface Shop {
  shop_name: string;
  shop_token: string;
  created_at?: Date;
  last_login?: Date;
}

export interface ShopInput {
  shop_name: string | any;
  shop_token?: string;
}
