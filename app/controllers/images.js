// controllers/images.js

const upload = require('multer')();
const { readCoupon } = require('../services/reader');
// const { checkLotto } = require('../services/results');

module.exports = (app) => {
  app.post('/api/images', upload.single('image'), (req, res) => {
    if (req.file) {
      console.log(req.file);
      return readCoupon(req.file)
        .then(text => res.status(200).json(text))
        .catch(err => res.status(500).json(err));
    }
    return res.status(500);
  });
};
