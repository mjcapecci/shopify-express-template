import Shopify from '@shopify/shopify-api';
import { Response, NextFunction } from 'express';

module.exports = function (req: any, res: Response, next: NextFunction) {
  // skips function if in development
  if (process.env.BYPASS_SECURITY_FOR_DEV === 'true') {
    next();
  }

  // splits out the "Bearer ...token" into strictly the jwt token
  const token = req.headers.authorization.split(' ')[1];
  const decoded = Shopify.Utils.decodeSessionToken(token);
  const date = Math.floor(Date.now() / 1000);

  // compares decoded to a series of fail cases
  if (
    decoded.aud !== process.env.API_KEY ||
    date > decoded.exp ||
    date < decoded.nbf
  ) {
    res.status(400).json({ msg: 'There was an error processing the request.' });
    return;
  }

  next();
};
