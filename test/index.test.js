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
    rc.getAll()
      .then(response => {
        expect(response).to.be.an('array');
      });
  });

  it('returns three elements of type object inside the response', () => {
    rc.getAll()
      .then(response => {
        for (let value of response) {
          expect(value).to.be.an('object');
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
    rc.findByName('france')
      .then(response => {
        expect(response).to.be.an('array');
      });
  });

  it('returns one element of type object inside the response', () => {
    rc.findByName('france')
      .then(response => {
        expect(response[0]).to.be.an('object');
        expect(response.length).to.equal(1);
      });
  });
});

describe('getAllGroupedBySubRegion()', () => {

  let getAllResponse = require('./mock/get-all-response');
  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/all')
      .reply(200, getAllResponse);
  });

  describe('knowing beforehand that the mocked response has three different subregions', () => {
    it('returns an object', () => {
      rc.getAllGroupedBySubRegion()
        .then(response => {
          expect(response).to.be.an('object');
      });
    });

    it('the object contains three keys repesenting the subregions', () => {
      rc.getAllGroupedBySubRegion()
        .then(response => {
          let responseKeys = Object.keys(response);
          expect(responseKeys.length).to.equal(3);
          expect(responseKeys).to.deep.equal(['southern-europe', 'western-europe', 'south-america']);
      });
    });

    it('each subregion key points to an array that contains objects representing countries', () => {
      rc.getAllGroupedBySubRegion()
        .then(response => {
          let responseKeys = Object.keys(response);

          responseKeys.forEach(key => {
            expect(response[key]).to.be.an('array');

            response[key].forEach(countryObject => {
              expect(countryObject).to.be.an('object');
            });

          });

      });
    });
  });

});
