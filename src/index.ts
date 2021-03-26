import express from 'express';
import Shopify, { ApiVersion, AuthQuery } from '@shopify/shopify-api';
require('dotenv').config();

const app = express();

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST } = process.env;

Shopify.Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST,
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.October20,
});

// define routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Duplicate Product Inspector is now listening on port ${
      process.env.PORT || 5000
    }`
  );
});
