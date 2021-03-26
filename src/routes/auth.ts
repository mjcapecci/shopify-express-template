import { AuthQuery, Shopify } from '@shopify/shopify-api';
import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/login', async (req: Request, res: Response) => {
  const { SHOP } = process.env;
  let authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    SHOP,
    '/api/auth/callback',
    true
  );
  return res.redirect(authRoute);
});

router.get('/callback', async (req: Request, res: Response) => {
  console.log('TESTER, TESTER, 12345');
  try {
    await Shopify.Auth.validateAuthCallback(
      req,
      res,
      (req.query as unknown) as AuthQuery
    );
  } catch (error) {
    console.error(error);
  }
  return res.redirect('/');
});

module.exports = router;
