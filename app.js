const tesseract = require('node-tesseract');
const {
  checkLotto,
  checkEuroJackpot,
} = require('./gameService');

const ROW_END = 'PP';
const rowIdentifiers = [
  'A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.',
  'H.', 'I.', 'J.', 'K.', 'L.', 'M.', 'N.',
  'O.', 'P.', 'Q.', 'R.', 'S.', 'T.',
];

const readCoupon = () => {
  const options = {
    psm: 6,
  };

  return new Promise((resolve, reject) => {
    tesseract.process('./lotto.jpg', options, (err, text) => {
      if (err) {
        reject(err);
      } else {
        resolve(text);
      }
    });
  });
};


const parseDraws = (text) => {
  const numbers = rowIdentifiers.map((identifier) => {
    const start = text.indexOf(identifier);
    const end = text.indexOf(ROW_END, start);
    const row = text.slice(start, end).trim();

    return row.split(' ')
      .reduce((acc, curr) => {
        if (parseInt(curr, 10)) {
          acc.push(parseInt(curr, 10));
        }
        return acc;
      }, []);
  });

  console.log(numbers);

  return Promise.resolve(numbers);

  // checkLotto(numbers).then(res => console.log(res));
  // checkEuroJackpot(numbers).then(res => console.log(res));
};

readCoupon()
  .then(parseDraws)
  .then(checkLotto)
  .then(res => console.log(res));

module.exports = {
  parseDraws,
};
