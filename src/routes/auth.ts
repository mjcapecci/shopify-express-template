import Shopify, { AuthQuery } from '@shopify/shopify-api';
import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/login', async (req: any, res: any) => {
  // 1. Save store on successful install
  // 2. Start checking using APP is main app route, and check to see if store exists on there. If it does (a) / does not (b):
  // a. Serve the app
  // b. Install the app on the store, and save the store in the DB
  // 3. Remove FaunaDB functionality and save for a rainy day
  // 4. Get basic react app with App Bridge up and running

  // let authRoute = await Shopify.Auth.beginAuth(
  //   req,
  //   res,
  //   SHOP,
  //   '/api/auth/callback',
  //   false
  // );

  return res.send('Success (Install)');
  // return res.redirect(authRoute);
});

router.get('/callback', async (req: any, res: any) => {
  try {
    await Shopify.Auth.validateAuthCallback(
      req,
      res,
      (req.query as unknown) as AuthQuery
    );
  } catch (error) {
    console.error(error);
  }
  return res.redirect(
    `https://${process.env.SHOP}/admin/apps/duplicate-product-dev/app`
  );
});

module.exports = router;
