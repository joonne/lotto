const chai = require('chai');

const expect = chai.expect;

const {
  parseDraws,
} = require('../app');

describe('app', () => {
  describe('parseDraws', () => {
    it('should parse a valid draw out of the given valid string', () => {
      const text = 'ialsmfOA(IHFeÖBNG\n)asdawrf A. 01 02 03 04 05 06 07 PP';
      const expected = [1, 2, 3, 4, 5, 6, 7];
      // just return a Promise since mocha accepts promises also
      return parseDraws(text).then(result => expect(result[0]).to.eql(expected));
    });
  });
});
