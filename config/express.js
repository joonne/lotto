// config/express.js

const glob = require('glob');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app, config) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(cors());

  const controllers = glob.sync(`${config.root}/app/controllers/*.js`);
  controllers.forEach((controller) => {
    require(controller)(app); // eslint-disable-line
  });

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500);
    res.json({
      message: err.message,
      title: 'error',
    });
  });
};
