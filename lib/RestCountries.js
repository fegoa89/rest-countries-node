var request = require('request');

class RestCountries {

  constructor() {
    this.apiHost = 'https://restcountries.eu';
    this.response = [];
  }
  getAll() {
    var options = {
      url: this.apiHost + '/rest/v2/all'
    };
    return new Promise(function(resolve, reject) {
      request.get(options, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          this.response = JSON.parse(body);
          resolve(this.response);
        }
      });
    })
  }
}

module.exports = RestCountries;
