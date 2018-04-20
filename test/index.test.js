const nock = require('nock');
const expect = require('chai').expect;

const RestCountries = require('../index');

let rc = new RestCountries;

describe('getAll()', () => {

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

describe('findByName()', () => {

  let findByNameResponse = require('./mock/find-by-name-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/name/france')
      .reply(200, findByNameResponse);
  });

  it('returns an object', () => {
    return rc.findByName('france')
      .then(response => {
        expect(typeof response).to.equal('object');
      });
  });

  it('returns one element of type object inside the response', () => {
    return rc.findByName('france')
      .then(response => {
        expect(typeof response[0]).to.equal('object');
        expect(response.length).to.equal(1);
      });
  });
});
