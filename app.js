// app.js

const express = require('express');
const config = require('./config/config');

const app = express();
require('./config/express')(app, config);

app.listen(config.port, config.ipAddress, () => {
  console.log(`listening at ${config.ipAddress}:${config.port}`);
});
