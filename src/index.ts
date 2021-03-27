import express from 'express';
import Shopify, { ApiVersion, AuthQuery } from '@shopify/shopify-api';
import FaunaDbStore from './db/faunadb-store';
require('dotenv').config();

const app = express();

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST } = process.env;

const sessionStorage = new FaunaDbStore();

Shopify.Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST,
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.October20,
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback,
    sessionStorage.loadCallback,
    sessionStorage.deleteCallback
  ),
});

// define routes
app.use('/api/auth', require('./routes/auth'));
app.get('/app', async (req, res) => {
  res.send('Success');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is now listening on port ${process.env.PORT || 5000}`);
});
