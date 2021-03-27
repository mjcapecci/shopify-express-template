import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Shop, ShopInput } from '../../types/Shop';

class DB_Shop {
  static installShop = async (input: ShopInput): Promise<string> => {
    await prisma.shop.create({
      data: {
        shop_name: input.shop_name,
        shop_token: input.shop_token,
      },
    });
    return 'Success: Shop saved to database';
  };

  static getShop = async (input: ShopInput): Promise<Shop> => {
    return await prisma.shop.findUnique({
      where: {
        shop_name: input.shop_name,
      },
    });
  };
}

export default DB_Shop;
