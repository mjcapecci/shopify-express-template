const express = require('express');
const router = express.Router();

// Types
import { Request, Response } from 'express';
import { Shopify } from '@shopify/shopify-api';

// Routes
router.get('/', async (req: Request, res: Response) => {
  const decodedJwt = await Shopify.Utils.decodeSessionToken(
    req.headers.authorization.replace('Bearer ', '')
  );

  res.status(200).json({ msg: 'It worked' });
});

module.exports = router;
