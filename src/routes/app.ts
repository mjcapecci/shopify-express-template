const path = require('path');
const express = require('express');
const router = express.Router();
import DB_Shop from '../db/DB_Shop';

// Types
import { Request, Response } from 'express';

// Routes
router.get('/app', async (req: Request, res: Response) => {
  const token = (await DB_Shop.getShop({ shop_name: req.query.shop }))
    ?.shop_token;

  if (token) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  } else {
    res.redirect('/api/auth/install');
  }
});

module.exports = router;
