const tesseract = require('node-tesseract');

const readCoupon = (file) => {
  const options = {
    psm: 6,
  };

  return new Promise((resolve, reject) => {
    tesseract.process(file, options, (err, text) => {
      if (err) {
        reject(err);
      } else {
        resolve(text);
      }
    });
  });
};

module.exports = {
  readCoupon,
};
