const express = require('express');
const verifySessionToken = require('../middleware/verifySessionToken');
const router = express.Router();
const q = require('querystring');

// Types
import { Response } from 'express';

// Routes
router.get('/', verifySessionToken, async (req: any, res: Response) => {
  const qString = req.headers.referer.substring(
    req.headers.referer.indexOf('?') + 1
  );
  const parsedReferer = q.parse(qString);
  const shop = parsedReferer.shop;

  res.status(200).json({ name: shop });
});

module.exports = router;
