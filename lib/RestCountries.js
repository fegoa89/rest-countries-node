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

  _performAsyncRequest(opt) {
    return new Promise(function(resolve, reject) {
      request.get(opt, function(err, resp, body) {
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
