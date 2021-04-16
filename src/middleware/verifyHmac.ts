const crypto = require('crypto');
import { Shopify } from '@shopify/shopify-api';
import { Response, NextFunction } from 'express';
const q = require('querystring');

/**
 * Verifies the HMAC of HTTP requests.
 */
module.exports = async function (req: any, res: Response, next: NextFunction) {
  let valid = false;
  let fromHeader = false;

  if (req.path === '/api/auth/install' || req.path === '/api/auth/callback') {
    valid = true;
    return next();
  }

  if (req.rawBody && req.headers['x-shopify-hmac-sha256']) {
    fromHeader = true;
    const hmacHeader = req.headers['x-shopify-hmac-sha256'];
    const digest = crypto
      .createHmac('SHA256', process.env.API_SECRET_KEY)
      .update(req.rawBody)
      .digest('base64');

    valid = digest === hmacHeader;
  } else if (req.headers.referer && req.headers.referer.includes('hmac')) {
    const qString = req.headers.referer.substring(
      req.headers.referer.indexOf('?') + 1
    );
    const parsedReferer = q.parse(qString);
    req.storename = parsedReferer.shop;

    const updated = removeFromQString('hmac', qString);

    const digest: any = crypto
      .createHmac('SHA256', process.env.API_SECRET_KEY)
      .update(updated)
      .digest('hex');
    valid = digest === parsedReferer.hmac;
  } else {
    valid = await Shopify.Utils.validateHmac(req.query);
  }

  const bypassed = process.env.BYPASS_SECURITY_FOR_DEV;
  if (!valid && !bypassed) {
    console.log('Invalid HMAC');
    return res.status(403).send('Forbidden');
  } else {
    if (bypassed) console.log('HMAC SECURITY BYPASSED');
    else console.log('HMAC VERIFIED');
  }

  next();
};

const removeFromQString = (name: any, qString: any) => {
  const idx = qString.indexOf(name);
  const subName = qString.substring(idx, qString.indexOf('&', idx) + 1);
  const qStringUpdated = qString.replace(subName, '');
  return qStringUpdated;
};
