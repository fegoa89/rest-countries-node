const nock = require('nock');
const expect = require('chai').expect;

const restCountries = require('../index');

describe('getAll()', () => {

  let rc = new restCountries;
  let getAllResponse = require('./mock/get-all-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/all')
      .reply(200, getAllResponse);
  });

  it('returns an object', () => {
    return rc.getAll()
      .then(response => {
        expect(typeof response).to.equal('object');
      });
  });

  it('returns three elements of type object inside the response', () => {
    return rc.getAll()
      .then(response => {
        for (let value of response) {
          expect(typeof value).to.equal('object');
        };

        expect(response.length).to.equal(3);
      });
  });
});
