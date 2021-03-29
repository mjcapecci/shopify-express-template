import Shopify, { AuthQuery } from '@shopify/shopify-api';
import { Request, Response } from 'express';
import DB_Shop from '../db/DB_Shop';
import Uninstall from '../api/Webhooks/Uninstall';
const express = require('express');
const router = express.Router();

const { SHOP } = process.env;

router.get('/install', async (req: Request, res: Response) => {
  let authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    SHOP,
    '/api/auth/callback',
    false
  );

  return res.redirect(authRoute);
});

router.get('/callback', async (req: Request, res: Response) => {
  try {
    await Shopify.Auth.validateAuthCallback(
      req,
      res,
      (req.query as unknown) as AuthQuery
    );
    const currentSession = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      false
    );

    DB_Shop.installShop({
      shop_name: currentSession.shop,
      shop_token: currentSession.accessToken,
    });

    const uninstall = new Uninstall(
      currentSession.shop,
      currentSession.accessToken
    );

    await uninstall.subscribeToWebhook('app/uninstall', {
      callbackUrl: process.env.BASE_URL + '/api/webhooks/uninstall',
      format: 'JSON',
    });
  } catch (error) {
    console.error(error);
  }

  return res.redirect(`https://${SHOP}/admin/apps/duplicate-product-dev/app`);
});

module.exports = router;
