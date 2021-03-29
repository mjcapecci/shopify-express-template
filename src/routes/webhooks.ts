const express = require('express');
const router = express.Router();
import DB_Shop from '../db/DB_Shop';

// Types
import { Request, Response } from 'express';

// Routes
router.post('/uninstall', async (req: Request, res: Response) => {
  const shopName = req.headers['x-shopify-shop-domain'];

  await DB_Shop.deleteShop({ shop_name: shopName });

  res.sendStatus(200);
});

module.exports = router;
