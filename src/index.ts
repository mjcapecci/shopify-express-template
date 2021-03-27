require('dotenv').config();
const path = require('path');
import express from 'express';
import Shopify, { ApiVersion } from '@shopify/shopify-api';
const verifyHmac = require('./middleware/verifyHmac');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(verifyHmac);

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
app.use('/api/sample', require('./routes/sample'));
app.use('/', require('./routes/app'));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is now listening on port ${process.env.PORT || 5000}`);
});
