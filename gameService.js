const rp = require('request-promise');

const getResults = (gameName, from, to) => {
  const options = {
    uri: `https://www.veikkaus.fi/api/v1/draw-games/draws?game-names=${gameName}&status=RESULTS_AVAILABLE&date-from=${from}&date-to=${to}`,
    headers: {
      'Content-Type': 'application/json',
      'X-ESA-API-Key': 'WWW', // the same API key that veikkaus.fi is using
    },
    json: true,
  };
  return rp(options).then(response => response.draws[0].results);
};

// TODO: need to check results properly (also the secondary numbers)
const checkLotto = draws => getResults('LOTTO', 1486407600000, 1487012400000)
  .then(results =>
    draws.map(draw =>
      draw.filter(number =>
        results[0].primary.includes(String(number)))));

// TODO: need to check results properly (also the secondary numbers)
const checkEuroJackpot = draws => getResults('EJACKPOT', 1486407600000, 1487012400000)
  .then(results =>
    draws.map(draw =>
      draw.filter(number =>
        results[0].primary.includes(String(number)))));

module.exports = {
  checkLotto,
  checkEuroJackpot,
};
