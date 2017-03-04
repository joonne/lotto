// config/config.js

const path = require('path');

const root = path.normalize(`${__dirname}/..`);
const port = 10010;
const ipAddress = '127.0.0.1';

const config = {
  root,
  port,
  ipAddress,
};

module.exports = config;
