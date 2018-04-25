let _ = require('lodash');
let request = require('request');

class RestCountries {

  constructor() {
    this.apiHost = 'https://restcountries.eu';
  }

  getAll() {
    if (this.getAllResponse) {
      return this.getAllResponse;
    }

    let options = {
      url: this.apiHost + '/rest/v2/all'
    };
    this.getAllResponse = this._performAsyncRequest(options);
    return this.getAllResponse;
  }

  findByName(countryName) {
    let options = {
      url: this.apiHost + `/rest/v2/name/${countryName}`
    };

    return this._performAsyncRequest(options);
  }

  findByFullName(countryName) {
    let options = {
      url: this.apiHost + `/rest/v2/name/${countryName}?fullText=true`
    };

    return this._performAsyncRequest(options);
  }

  findByIsoCountryCode(isoCountryCode) {
    let options = {
      url: this.apiHost + `/rest/v2/alpha/${isoCountryCode}`
    };

    return this._performAsyncRequest(options);
  }

  findByIsoCountryCodes(isoCountryCodes) {
    let options = {
      url: this.apiHost + `/rest/v2/alpha?codes=${isoCountryCodes}`
    };

    return this._performAsyncRequest(options);
  }

  getAllGroupedBySubRegion() {
    return this.getAll().then((getAllResponse) => {
      let groupedByResponse = {};
      let uniqSubRegions = _.uniq(_.map(getAllResponse, 'subregion'));

      _.forEach(uniqSubRegions, function(subRegion, index) {
        let subRegionKey = subRegion.toLowerCase().replace(' ', '-');
        let countriesBySubRegion = _.filter(getAllResponse, {'subregion': subRegion});
        groupedByResponse[subRegionKey] = countriesBySubRegion;
      });

      return groupedByResponse;
    });
  }

  _performAsyncRequest(opt) {
    return new Promise((resolve, reject) => {
      request.get(opt, (err, resp, body) => {
        if (err) {
          reject(err);
        } else {
          let response = JSON.parse(body);
          resolve(response);
        }
      });
    });
  }
}

module.exports = RestCountries;
