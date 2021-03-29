import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Shop, ShopInput } from '../../types/Shop';

class DB_Shop {
  static installShop = async (input: ShopInput): Promise<string> => {
    try {
      await prisma.shop.create({
        data: {
          shop_name: input.shop_name,
          shop_token: input.shop_token,
        },
      });
      return 'Success: Shop saved to database';
    } catch (error) {
      console.log(error);
    }
  };

  static deleteShop = async (input: ShopInput): Promise<string> => {
    try {
      await prisma.shop.delete({
        where: {
          shop_name: input.shop_name,
        },
      });
      return 'Success: Shop deleted from database';
    } catch (error) {
      console.log(error);
    }
  };

  static getShop = async (input: ShopInput): Promise<Shop> => {
    try {
      return await prisma.shop.findUnique({
        where: {
          shop_name: input.shop_name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default DB_Shop;
