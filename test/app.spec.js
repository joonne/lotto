const expect = require('chai').expect;
const {
  parseDraws,
} = require('../app');

describe('app', () => {
  describe('parseDraws', () => {
    it('should parse a valid draw out of the given valid string', () => {
      const text = 'ialsmfOA(IHFeÖBNG\n)asdawrf A. 01 02 03 04 05 06 07 PP';
      const expected = [1, 2, 3, 4, 5, 6, 7];
      const result = parseDraws(text)[0];
      expect(result).to.be.an('array');
      expect(result).to.eql(expected);
    });
  });
});
