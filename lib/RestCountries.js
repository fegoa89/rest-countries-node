var _ = require('lodash');
var request = require('request');

class RestCountries {

  constructor() {
    this.apiHost = 'https://restcountries.eu';
  }

  getAll() {
    if (this.getAllResponse) {
      return this.getAllResponse;
    }

    var options = {
      url: this.apiHost + '/rest/v2/all'
    };
    this.getAllResponse = this._performAsyncRequest(options);
    return this.getAllResponse;
  }

  findByName(countryName) {
    var options = {
      url: this.apiHost + `/rest/v2/name/${countryName}`
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
          var response = JSON.parse(body);
          resolve(response);
        }
      });
    });
  }
}

module.exports = RestCountries;
