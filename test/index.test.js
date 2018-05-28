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

describe('findByFullName()', () => {

  let findByFullNameResponse = require('./mock/find-by-name-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/name/france?fullText=true')
      .reply(200, findByFullNameResponse);
  });

  it('returns an array', () => {
    rc.findByFullName('france')
      .then(response => {
        expect(response).to.be.an('array');
      });
  });

  it('returns one element of type object inside the response', () => {
    rc.findByFullName('france')
      .then(response => {
        expect(response[0]).to.be.an('object');
        expect(response.length).to.equal(1);
      });
  });
});

describe('findByIsoCountryCode()', () => {

  let findByIsoCountryCodeResponse = require('./mock/find-by-iso-country-code-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/alpha/bg')
      .reply(200, findByIsoCountryCodeResponse);
  });

  it('returns an object', () => {
    rc.findByIsoCountryCode('bg')
      .then(response => {
        expect(response).to.be.an('object');
      });
  });
});

describe('findByIsoCountryCodes()', () => {

  let findByIsoCountryCodesResponse = require('./mock/find-by-iso-country-codes-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/alpha?codes=pl;gb;it')
      .reply(200, findByIsoCountryCodesResponse);
  });

  it('returns an array', () => {
    rc.findByIsoCountryCodes('pl;gb;it')
      .then(response => {
        expect(response).to.be.an('array');
      });
  });
});

describe('findByCurrency()', () => {

  let findByIsoCurrencyResponse = require('./mock/find-by-currency-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/currency/pln')
      .reply(200, findByIsoCurrencyResponse);
  });

  it('returns an array', () => {
    rc.findByCurrency('pln')
      .then(response => {
        expect(response).to.be.an('array');
      });
  });

  it('returns one element of type object inside the response', () => {
    rc.findByCurrency('pln')
      .then(response => {
        expect(response[0]).to.be.an('object');
        expect(response.length).to.equal(1);
      });
  });
});

describe('findByLanguageCode()', () => {

  let findByLanguageCodeResponse = require('./mock/find-by-language-code-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/lang/it')
      .reply(200, findByLanguageCodeResponse);
  });

  it('returns an array', () => {
    rc.findByLanguageCode('it')
      .then(response => {
        expect(response).to.be.an('array');
      });
  });

  it('returns one element of type object inside the response', () => {
    rc.findByLanguageCode('it')
      .then(response => {
        expect(response[0]).to.be.an('object');
      });
  });
});

describe('findByCapitalCity()', () => {

  let findByCapitalCityResponse = require('./mock/find-by-capital-city-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/capital/tallinn')
      .reply(200, findByCapitalCityResponse);
  });

  it('returns an array', () => {
    rc.findByCapitalCity('tallinn')
      .then(response => {
        expect(response).to.be.an('array');
      });
  });

  it('returns one element of type object inside the response', () => {
    rc.findByCapitalCity('tallinn')
      .then(response => {
        expect(response[0]).to.be.an('object');
      });
  });
});

describe('findByCallingCode()', () => {

  let findByCapitalCityResponse = require('./mock/find-by-capital-city-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/callingcode/377')
      .reply(200, findByCapitalCityResponse);
  });

  it('returns an array', () => {
    rc.findByCallingCode('377')
      .then(response => {
        expect(response).to.be.an('array');
      });
  });

  it('returns one element of type object inside the response', () => {
    rc.findByCallingCode('377')
      .then(response => {
        expect(response[0]).to.be.an('object');
      });
  });
});

describe('findByRegion()', () => {

  let findByRegionResponse = require('./mock/find-by-capital-city-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/region/oceania')
      .reply(200, findByRegionResponse);
  });

  it('returns an array', () => {
    rc.findByRegion('oceania')
      .then(response => {
        expect(response).to.be.an('array');
      });
  });

  it('returns one element of type object inside the response', () => {
    rc.findByRegion('oceania')
      .then(response => {
        expect(response[0]).to.be.an('object');
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

describe('findCountryFlagByCountryName()', () => {

  let getAllResponse = require('./mock/get-all-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/all')
      .reply(200, getAllResponse);
  });

  describe('looking for a valid country name', () => {
    it('returns an object', () => {
      rc.findCountryFlagByCountryName('Spain')
        .then(response => {
          expect(response).to.be.an('object');
      });
    });

    it('the object contains two keys - countryName and flag', () => {
      rc.findCountryFlagByCountryName('Spain')
        .then(response => {
          let responseKeys = Object.keys(response);
          expect(responseKeys).to.deep.equal(['countryName', 'flag']);
      });
    });
  });

  describe('looking for a not existing country name', () => {
    it('returns an empty object', () => {
      rc.findCountryFlagByCountryName('Hola')
        .then(response => {
          expect(response).to.be.an('array').that.is.empty;
      });
    });
  });
});

describe('findCountryByForeignName()', () => {
  let getAllResponse = require('./mock/get-all-response');

  beforeEach(() => {
    nock('https://restcountries.eu')
      .get('/rest/v2/all')
      .reply(200, getAllResponse);
  });

  describe('looking for a valid country name', () => {
    it('returns an object', () => {
      rc.findCountryByForeignName('スペイン')
        .then(response => {
          expect(response).to.be.an('object');
      });
    });

    it('the object returned is "Spain"', () => {
      rc.findCountryByForeignName('スペイン')
        .then(response => {
          expect(response.name).to.equal('Spain');
      });
    })
  });

  describe('looking for a not existing country name', () => {
    it('returns an empty object', () => {
      rc.findCountryByForeignName('1234')
        .then(response => {
          expect(response).to.be.an('array').that.is.empty;
      });
    });
  });
});
