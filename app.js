const Tesseract = require('tesseract.js');
const {
  checkLotto,
  checkEuroJackpot
} = require('./gameService');

const ROW_END = 'PP';
const rowIdentifiers = [
  'A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.',
  'H.', 'I.', 'J.', 'K.', 'L.', 'M.', 'N.',
  'O.', 'P.', 'Q.', 'R.', 'S.', 'T.',
];

const readCoupon = () => Tesseract.recognize('./eurojackpot.jpg')
  .progress((p) => { console.log('progress', p); })
  .then(result => result.text);


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

  // console.log(numbers);

  return numbers;

  // checkLotto(numbers).then(res => console.log(res));
  // checkEuroJackpot(numbers).then(res => console.log(res));
};

readCoupon().then(parseDraws);

module.exports = {
  parseDraws,
};
